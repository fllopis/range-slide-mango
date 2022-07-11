import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

const RangePicker = (props) => {

    //References for components.
    const dotSelectedLeft   = useRef(null);
    const dotSelectedRight  = useRef(null);
    const rangeContent      = useRef(null);

    //Vars from props to configure the input
    const {min, max, maxSize, readOnly} = props;

    //Default vars/const
    const [dotComponent, setDotComponent]                               = useState("dot-right");
    const [oldXMousePositionWhenMove, setOldXMousePositionWhenMove]     = useState(0);
    const [moveAllowed, setMoveAllowed]                                 = useState(false);
    let horizontalDirection                                             = "";

    //Define the limits of left and right dot.
    const [xLeftComponent, setXLeftComponent]   = useState(0);
    const [xRightComponent, setXRightComponent] = useState(100);

    //Stablashing the extrems of each dot.
    const [extremesDotsValues, setExtremesDotsValues] = useState({
        left: {
          min: min,
          max: max,
        },
        right: {
          min: min,
          max: max,
        },
    });

    //Actual position for each value
    const [actualPosition, setActualPosition] = useState({
        left: min,
        right: max,
    });

    //Autcomplete the min/max values, waiting of his recievement.
    useEffect(() => {
        setExtremesDotsValues({
            left: { min: min, max: max },
            right: { min: min, max: max },
        });
        setActualPosition({ ...actualPosition, left: min, right: max });
        //fixedType && setPositionArray(priceArray);
    }, [min, max]);

    //Function to detect when the cursor is down on any dot.
    let mouseDown = (e, dotSelector) => {
        setDotComponent(dotSelector);
        setMoveAllowed(true);
    };

    //Function to return the set component to edit.
    let setXComponent = () => {
        return dotComponent?.id === "dot-right"
          ? setXRightComponent
          : setXLeftComponent;
    };

    //Function to get the x component, to know which dot are moving.
    let getXComponent = () => {
        return dotComponent?.id === "dot-right"
          ? xRightComponent
          : xLeftComponent;
    };

    //Function to change the position of dot.
    let changeActualPosition = (value) => {
        if(dotComponent.id === "dot-right")
            setActualPosition({ ...actualPosition, right: value });
        else
            setActualPosition({ ...actualPosition, left: value });
    };

    //Function that move the dot to right or left in base to his actual position and percentage.
    let moveAndCalculateDotPosition = (e) => {

        //Obtaining the with of our content bar and position
        let contentWith         = rangeContent.current.offsetWidth;
        let contentLeftPosition = rangeContent.current.offsetLeft;

        //Value of dot when move
        let getValue = min + (max - min) * (getXComponent() / 100);

        //If can move the dot, then move right or left.
        if (moveAllowed) {

            //Depending of the direction of our mouse we'll move the dot to the direction.
            switch (horizontalDirection) {

                //Left mouse movement.
                case "left":

                    //We need to know if is a normal range or fixed range with some values.
                    if(readOnly){
                        //moveToLeftFixed(e, contentWith, contentLeftPosition, getValue);
                        console.log('Necesitamos movernos de forma fija a determinados valores.');
                    }
                    else
                        moveToLeft(e, contentWith, contentLeftPosition, getValue);

                    return;

                //Right mouse movement.
                case "right":

                    //We need to know if is a normal range or fixed range with some values.
                    if(readOnly){
                        //moveToRightFixed(e, contentWith, contentLeftPosition, getValue);
                        console.log('Necesitamos movernos de forma fija a determinados valores.');
                    }
                    else
                        moveToRight(e, contentWith, contentLeftPosition, getValue);
                    
                    return;

                default:
                    return;
          }
        }
    };

    //Function to move the dot normal to left.
    let moveToLeft = (e, contentWith, contentLeftPosition, getValue) => {
        
        //If can't move to left, return false
        if (!canDotMoveToLeft()) 
            return;

        if (getXComponent() > 0) {
            setXComponent()(((e.clientX - contentLeftPosition) * 100) / contentWith);
            changeActualPosition(Math.round(getValue));
        } 
        else if(getXComponent() <= 0)
            changeActualPosition(Math.round(min));
    };
    
    //Function to move the dot normal to right.
    let moveToRight = (e, contentWith, contentLeftPosition, getValue) => {
        
        //If can't move to right, return false
        if(!canDotMoveToRight())
            return;

        if (getXComponent() < 100) {
            setXComponent()(((e.clientX - contentLeftPosition) * 100) / contentWith);
            changeActualPosition(Math.round(getValue));
        }
        else if(getXComponent() >= 100)
            changeActualPosition(max);
    };

    //Check if our dot can move to left, depending if the actual position is less than left dot. (To avoid the crash between two dots)
    let canDotMoveToLeft = () => {
        if (dotComponent.id === "dot-right"){
            return actualPosition.right > actualPosition.left + 1;
        }
        return true;
    };
    
    //Check if our dot can move to right, depending if the actual position is less than right dot. (To avoid the crash between two dots)
    let canDotMoveToRight = () => {
        if (dotComponent.id === "dot-left"){
            return actualPosition.left < actualPosition.right - 1;
        }
        return true;
    };

    //When the mouse is moving then we need to detect where is moving.
    let mouseIsMoving = (e) => {

        if(e.pageX < oldXMousePositionWhenMove)
            horizontalDirection = "left";
        else if(e.pageX > oldXMousePositionWhenMove)
            horizontalDirection = "right";

        setOldXMousePositionWhenMove(e.pageX);

        //Lets go to move the selected dot.
        moveAndCalculateDotPosition(e);
    };

    //Detecting when mouse up of dot.
    let mouseUp = (e) => {
        //let newPosition = getArrayState();
        //fixedType && changeActualPosition(positionsArray[newPosition]);
        //fixedType && setArrayState()(newPosition);
        setMoveAllowed(false);
    };

    //Updating the dot position with input value.
    let updateDotsPosition = (newPositions, dotType) => {
        
        //Extracting the left and right new positions to update the position dots.
        let { left, right } = newPositions;

        console.log(newPositions);

        //Depending of the dotType we'll update the same
        switch (dotType) {

            //Left dot update when input change.
            case "dot-left":
                if (left < min){
                    setActualPosition({ ...actualPosition, left: min });

                    //Force the left min, to the min as possible
                    left = min;
                }
                else if (left >= right){
                    setActualPosition({ ...actualPosition, left: right - 1 });

                    //Force the left position to right - 1
                    left = right - 1;
                }
                
                //Updating the dot position
                setXLeftComponent(((left - min) * 100) / (max - min));

                return;
            
            //Right dot update
            case "dot-right":
                if (right >= max){
                    setActualPosition({ ...actualPosition, right: max });

                    //Force the max right, to the max as possible
                    right = max;
                }
                else if (right <= left){
                    setActualPosition({ ...actualPosition, right: left + 1 });

                    //Is right position is less than left, then we need to force too de right position to left + 1.
                    right= left + 1;
                }

                //Updating the dot position
                setXRightComponent(((right - min) * 100) / (max - min));

                return;
        }
    }

    return (
        <div className="">
            
            {/* CONTENT OF RANGE PICKER SLIDER */}
            <div ref={rangeContent} className="d-flex justify-content-center rangePickerSlide_container" onMouseMove={(e) => mouseIsMoving(e)} onMouseUp={(e) => mouseUp(e)}>

                <div className="rangePicker__Input minInput">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        readOnly={readOnly}
                        placeholder={min}
                        style={{ left: `${xLeftComponent}%` }}
                        id="input-left"
                        value={actualPosition.left}
                        onChange={ (e) => setActualPosition({ ...actualPosition, left: parseInt(e.target.value) || 0})}
                        onBlur={ (e) => updateDotsPosition(actualPosition, 'dot-left') }
                        onMouseDown={(e) => mouseDown(e, dotSelectedLeft.current)}
                        autoComplete="off"
                    />
                </div>

                {/* first dot */}
                <div className="rangePicker__dot dot__left"
                    onMouseDown={(e) => mouseDown(e, dotSelectedLeft.current)}
                    style={{ left: `${xLeftComponent}%` }}
                    ref={dotSelectedLeft}
                    id="dot-left"
                    min-value={extremesDotsValues.left.min}
                    max-value={extremesDotsValues.left.max}
                    actual-value={actualPosition.left}
                ></div>

                {/* line of range picker */}
                <div className="rangePicker__line"></div>

                {/* end dot */}
                <div className="rangePicker__dot dot__right"
                    onMouseDown={(e) => mouseDown(e, dotSelectedRight.current)}
                    ref={dotSelectedRight}
                    id="dot-right"
                    style={{ left: `${xRightComponent}%` }}
                    min-value={extremesDotsValues.right.min}
                    max-value={extremesDotsValues.right.max}
                    actual-value={actualPosition.right}
                ></div>

                <div className="rangePicker__Input maxInput">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        readOnly={readOnly}
                        placeholder={max}
                        style={{ left: `${xRightComponent}%` }}
                        id="input-right"
                        value={actualPosition.right}
                        onChange={(e) => setActualPosition({ ...actualPosition, right: parseInt(e.target.value) || 0 })}
                        onBlur={ (e) => updateDotsPosition(actualPosition, 'dot-right') }
                        onMouseDown={(e) => mouseDown(e, dotSelectedRight.current)}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
}

export default RangePicker;
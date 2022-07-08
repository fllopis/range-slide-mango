import React, { useState, useRef } from 'react';
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
    const [moveAllowed, setMoveAllowed]                                 = useState(false);
    const [oldXMousePositionWhenMove, setOldXMousePositionWhenMove]     = useState(0);
    let xDirection                                                      = "";

    //Define the limits of left and right dot.
    const [xLeftComponent, setXLeftComponent]   = useState(0);
    const [xRightComponent, setXRightComponent] = useState(97);

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

    console.log(extremesDotsValues);

    /* 
        NO SE ESTÁN SETEANDO LAS VARIABLES extremesDotsValues & actualPostion porque no reciben bien MIN y MAX.
        ============================================================================================================
    */

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
    let moveSelector = (e) => {

        //Obtaining the with of our content bar and position
        let contentWith         = rangeContent.current.offsetWidth;
        let contentLeftPosition = rangeContent.current.offsetLeft;

        //Value of dot when move
        let getValue = min + (max - min) * (getXComponent() / 100);

        //If can move the dot, then move right or left.
        if (moveAllowed) {

            console.log(xDirection);

            //Depending of the direction of our mouse we'll move the dot to the direction.
            switch (xDirection) {

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

        console.log('moving to left');

        /*if (getXComponent() > 0) {
            setXComponent()(((e.clientX - contentLeftPosition) * 100) / contentWith);
            changeActualPosition(Math.round(getValue));
        } 
        else if(getXComponent() === 0)
            changeActualPosition(Math.round(min));*/
    };
    
    //Function to move the dot normal to right.
    let moveToRight = (e, contentWith, contentLeftPosition, getValue) => {
        
        //If can't move to right, return false
        if(!canDotMoveToRight())
            return;

        console.log('moving to right');

        /*if (getXComponent() < 100) {
            setXComponent()(((e.clientX - contentLeftPosition) * 100) / contentWith);
            changeActualPosition(Math.round(getValue));
        }
        else if(getXComponent() === 100)
            changeActualPosition(max);*/
    };

    //Check if our dot can move to left, depending if the actual position is less than left dot. (To avoid the crash between two dots)
    let canDotMoveToLeft = () => {
        if (dotComponent.id === "dot-right")
            console.clear();
            console.log('--- [ LEFT ] ----');
            console.log(actualPosition);
            console.log(actualPosition.left);
            console.log(actualPosition.right);
            return actualPosition.right > actualPosition.left + 1;
        return true;
    };
    
    //Check if our dot can move to right, depending if the actual position is less than right dot. (To avoid the crash between two dots)
    let canDotMoveToRight = () => {
        if (dotComponent.id === "dot-left"){
            console.clear();
            console.log('--- [ RIGHT ] ----');
            console.log(actualPosition.left);
            console.log(actualPosition.right);
            return actualPosition.left < actualPosition.right - 1;
        }
        return true;
      };

    //When the mouse is moving then we need to detect the directin of the same.
    let mouseIsMoving = (e) => {

        if(e.pageX < oldXMousePositionWhenMove)
            xDirection = "left";
        else if(e.pageX > oldXMousePositionWhenMove)
            xDirection = "right";

        setOldXMousePositionWhenMove(e.pageX);

        //Lets go to move the selected dot.
        moveSelector(e);
    };

    return (
        <div className="">
            <div className="d-flex justify-content-center rangePicker__container" style={{ maxWidth: maxSize }}>
                
                <div className="rangePicker__Input minInput">
                    <input
                        min={min}
                        max={max}
                        readOnly={readOnly}
                        placeholder={min}
                        style={{ left: `${xLeftComponent}%` }}
                        id="input-left"
                        value={actualPosition.left}
                        onChange={(e) => setActualPosition({ ...actualPosition, [type]: parseInt(e.target.value) || 0})}
                    />
                </div>

                {/* CONTENT OF RANGE PICKER SLIDER */}
                <div ref={rangeContent} className="d-flex justify-content-center rangePickerSlide_container" onMouseMove={(e) => mouseIsMoving(e)}>

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

                </div>

                <div className="rangePicker__Input maxInput">
                    <input
                        min={min}
                        max={max}
                        readOnly={readOnly}
                        placeholder={max}
                        style={{ left: `${xRightComponent}%` }}
                        id="input-right"
                        value={actualPosition.right}
                        onChange={(e) => setActualPosition({ ...actualPosition, [type]: parseInt(e.target.value) || 0})}
                    />
                </div>
            
            </div>
        </div>
    );
}

export default RangePicker;
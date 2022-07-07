import React, { useState, useRef } from 'react';
import './styles.css';

const RangePicker = (props) => {

    //Vars from props to configure the input
    const {min, max, maxSize, readOnly} = props;

    //Refs of values
    //const refDot1 = useRef(null);
    //const refDot2 = useRef(null);

    //DragStart
    const onDragStart = (e) => {
        console.log(e);
    }

    //DragOver
    const onDragOver = (e) => {
	    e.preventDefault();
        console.log('finish');
	}

    //Drop cursor
    const onDrop = (e, task) => {
	    console.log(task);
	}

    return (
        <div className="">
            <div className="d-flex justify-content-center rangePicker__container" style={{ maxWidth: maxSize }}>
                
                <div className="rangePicker__Input minInput">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        readOnly={readOnly}
                        placeholder={min}
                    />
                </div>

                {/* CONTENT OF RANGE PICKER SLIDER */}
                <div className="d-flex justify-content-center rangePickerSlide_container">

                    {/* first dot */}
                    <div className="rangePicker__dot dot__start" 
                        onDragStart = {(event) => onDragStart(event)}
                        onDragOver={(event) => onDragOver(event)}
                        onDrop={(event) => { onDrop(event)}}

                        /*onMouseDown={enableMouseDragging}
                        onMouseUp={disableMouseDragging}
                        onMouseMove={(ev) => handleOnMouseMove(ev, minHandlerRef)}*/

                        draggable
                    ></div>

                    {/* line of range picker */}
                    <div className="rangePicker__line"></div>

                    {/* end dot */}
                    <div className="rangePicker__dot dot__end"
                        onDragStart={(event) => onDragStart(event)}
                        onDragOver={(event) => onDragOver(event)}
                        onDrop={(event) => { onDrop(event)}}
                        draggable
                    ></div>

                </div>

                <div className="rangePicker__Input maxInput">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        readOnly={readOnly}
                        placeholder={max}
                    />
                </div>
            
            </div>
        </div>
    );
}

export default RangePicker;
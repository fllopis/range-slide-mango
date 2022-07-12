import React, { useState } from 'react';
import RangePicker from "./RangePicker";
import './styles.css';

const Range = (props) => {

  //Getting vars from props to configure our range picker.
  const {min, max, isFixedRange, rangeArray} = props;

    return (
        <section>
          <div className="row mt-5">
            <div className="col-4 offset-4">
              <RangePicker
                min={min}
                max={max}
                isFixedRange={isFixedRange}
                rangeArray={rangeArray}
              />
            </div>
          </div>
        </section>
    );
}

Range.defaultProps = {
  min: undefined,
  max: undefined,
  rangeArray: [],
  isFixedRange: false,
};

export default Range;
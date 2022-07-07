import React, { useState } from 'react';
import RangePicker from "./RangePicker";
import './styles.css';

const Range = (props) => {

  //Getting vars from props to configure our range picker.
  const {min, max, rangeArrayValues} = props;

    return (
        <section>
          <div className="row mt-5">
            <div className="col-6 offset-3">
              <RangePicker
                min={min}
                max={max}
                maxSize="450px"
                readOnly={(rangeArrayValues.length > 0) ? true : false}
              />
            </div>
          </div>
        </section>
    );
}

Range.defaultProps = {
  min: undefined,
  max: undefined,
  rangeArrayValues: [],
};

export default Range;
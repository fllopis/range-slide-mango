import React, { useState } from 'react';
import RangePicker from "./RangePicker";
import './styles.css';

const Range = (props) => {

  //Getting vars from props to configure our range picker.
  const {min, max, isFixedRange, rangeArray} = props;

    return (
      <RangePicker
        min={min}
        max={max}
        isFixedRange={isFixedRange}
        rangeArray={rangeArray}
      />
    );
}

Range.defaultProps = {
  min: undefined,
  max: undefined,
  rangeArray: [],
  isFixedRange: false,
};

export default Range;
import React, { useEffect, useState } from "react";
import '../styles/style-main.css';
import fetchMockableUri from "../hooks/mockableHook";
import { mockableUrl, methodExercise2 } from '../core/config';
import Range from "../components/range-picker/Range";

const Exercise2 = () => {

  //Get a range values in array from Mockable API to configure our range picker.
  const rangeArrayData  = fetchMockableUri(mockableUrl, methodExercise2);

  //Default values
  const [params, setParams] = useState({
    min: 0,
    max: 0,
    rangeArray: [],
    isFixedRange: true
  });

  useEffect(() => {

    //Waiting to load the min, max and array of values.
    if( typeof rangeArrayData.rangeValues !== 'undefined'){

      //Finding the min and max value of array.
      let min = Math.min(...rangeArrayData.rangeValues);
      let max = Math.max(...rangeArrayData.rangeValues);

      setParams({ ...params, min: min, max: max, rangeArray: rangeArrayData.rangeValues });
    }
  }, [rangeArrayData]);

  return (
    <div className="mt-4">
      <h2>Fixed range picker</h2>
      <p>A fixed range picker, is mount through an array of values. You can drag any dot and this will put in the correct position.</p>
      <p>You can't edit the input values for this example.</p>
      <Range 
          min={params.min} 
          max={params.max}
          rangeArray={params.rangeArray}
          isFixedRange={params.isFixedRange}
        />
    </div>
  );
};

export default Exercise2;
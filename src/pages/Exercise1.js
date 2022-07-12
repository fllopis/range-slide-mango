import React from "react";
import '../styles/style-main.css';
import fetchMockableUri from "../hooks/mockableHook";
import { mockableUrl, methodExercise1 } from '../core/config';
import Range from "../components/range-picker/Range";

const Exercise1 = () => {

  //Get the min/max value from Mockable API
  const rangeData       = fetchMockableUri(mockableUrl, methodExercise1);

  return (
    <div className="row">
      <div className="col mt-4">

        <h2> Normal range</h2>
        <p>A normal range picker, where you can drag two bullets through the range line. Use the number label to change the value (min or max).</p>
        <p>If you edit the component with inputs, it will update when you leave the input.</p>
        
        <Range 
          min={rangeData.min} 
          max={rangeData.max}
          isFixedRange={false}
        />

      </div>
    </div>
  );
};

export default Exercise1;
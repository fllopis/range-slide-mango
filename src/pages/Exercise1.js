import React from "react";
import '../styles/style-main.css';
import fetchMockableUri from "../hooks/mockableHook";
import { mockableUrl, methodExercise1, methodExercise2 } from '../core/config';

const Exercise1 = () => {

  //Get the min/max value from Mockable API
  const rangeData       = fetchMockableUri(mockableUrl, methodExercise1);
  const rangeArrayData  = fetchMockableUri(mockableUrl, methodExercise2);

  console.log('Response:', rangeArrayData);

  return (
    <div>
      <h2> Normal range</h2>
      <p>A normal range picker, where you can drag two bullets through the range line. Use the number label to change the value (min or max).</p>
      <p>{rangeData.min}</p>
      <p>{rangeData.max}</p>
    </div>
  );
};

export default Exercise1;
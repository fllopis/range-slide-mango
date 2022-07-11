import React from "react";
import '../styles/style-main.css';
import fetchMockableUri from "../hooks/mockableHook";
import { mockableUrl, methodExercise1, methodExercise2 } from '../core/config';

const Exercise2 = () => {

  //Get a range values in array from Mockable API to configure our range picker.
  const rangeArrayData  = fetchMockableUri(mockableUrl, methodExercise2);

  return (
    <div className="mt-4">
      <h2>Fixed range picker</h2>

    </div>
  );
};

export default Exercise2;
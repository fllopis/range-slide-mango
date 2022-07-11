import React, { useEffect } from "react";
import '../styles/style-main.css';
import fetchMockableUri from "../hooks/mockableHook";
import { mockableUrl, methodExercise1, methodExercise2 } from '../core/config';

const Exercise2 = () => {

  //Get a range values in array from Mockable API to configure our range picker.
  const rangeArrayData  = fetchMockableUri(mockableUrl, methodExercise2);

  //Default values
  let min = 0;
  let max = 0;

  useEffect(() => {

    console.log(rangeArrayData);

    if(rangeArrayData.length > 0){

      /*console.log('listo');

      rangeArrayData.rangeValues.forEach( (data) => {
        console.log(data);
      });*/
    }
  }, [rangeArrayData]);

  return (
    <div className="mt-4">
      <h2>Fixed range picker</h2>

    </div>
  );
};

export default Exercise2;
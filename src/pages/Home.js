import React from "react";

const Home = () => {
  
  return (
    <div className="mt-4">
      <p>Welcome to home of Range Picker test for Mango.</p>
      <p>This project conssists in two types of range slide picker without using the html input type="range".</p>
      <ul>
        <li>We need to create the following component: <strong>&lt;React /&gt;</strong></li>
        <li>Using React to create the solution</li>
        <li>Don't use any CLI to create structure and architecture of the application.</li>
        <li>This component has two use modes:</li>
      </ul>
      <div className="row">
        <div className="col-6">
          <p><strong>Exercise1:</strong> A normal picker with min and max values from Mockable API.</p>
          <p><strong>Exercise2:</strong> A range picker with some fixed values that provide from an array from Mockable API</p>
        </div>
        <div className="col-6 text-center">
        <img src={"../assets/imgs/example-ranges.png"} />
        </div>
      </div>
      <p></p>
    </div>
  );
};

export default Home;
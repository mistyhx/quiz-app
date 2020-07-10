import React from "react";
import "./index.css";

const questionsIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const Block = ({ item, indexNumber }) => {
  return <div className={indexNumber >= item ? "block-dark" : "block-light"} />;
};
const Progress = ({ indexNumber }) => {
  return (
    <div className="progress-bar">
      {questionsIndexes.map(item => (
        <Block key={item} item={item} indexNumber={indexNumber} />
      ))}
    </div>
  );
};

export default Progress;

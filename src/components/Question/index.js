import React from "react";
import "./index.css";

function Shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Options = ({ item }) => {
  return <div className="option">{item}</div>;
};

const Question = ({ data, indexNumber }) => {
  const { question, answer, selections } = data;
  const shuffledSelections = Shuffle(selections);

  return (
    <div className="question-container">
      <div className="question-data">
        <div className="question">{question}</div>
        <div className="answers">
          {shuffledSelections.map((item, index) => (
            <Options key={index} item={item} />
          ))}
        </div>
        {/*<div>{answer}</div>*/}
      </div>
      <div className="question-index">
        {indexNumber < 10 && "0"}
        {indexNumber}
      </div>
    </div>
  );
};

export default Question;

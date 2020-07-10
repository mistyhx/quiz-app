import React from "react";
import "./index.css";
import { Shuffle } from "../../utils/Helpers";

const Options = ({ item }) => {
  return <div className="option">{item}</div>;
};

const Question = ({ data, indexNumber, cardColor }) => {
  const { question, answer, selections } = data;
  const shuffledSelections = Shuffle(selections);

  return (
    <div className="question-container" style={{ backgroundColor: cardColor }}>
      <div className="question-data">
        <div className="question">{question}</div>
        <div className="answers">
          {shuffledSelections.map((item, index) => (
            <Options key={index} item={item} />
          ))}
        </div>
        <div>{answer}</div>
      </div>
      <div className="question-index">
        {indexNumber < 10 && "0"}
        {indexNumber}
      </div>
    </div>
  );
};

export default Question;

import React from "react";

function Shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Question = ({ data }) => {
  const { question, answer, selections } = data;
  const shuffledSelections = Shuffle(selections);

  return (
    <div>
      <div>{question}</div>
      <div>
        {shuffledSelections.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div>{answer}</div>
    </div>
  );
};

export default Question;

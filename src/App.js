import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`)
      .then(res => res.json())
      .then(result => {
        const temp = result.results.map(function (item) {
          return {
            question: item.question,
            answer: item.correct_answer,
            selections: [...item.incorrect_answers, item.correct_answer],
          };
        });

        setQuestions(temp);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleNext = () => {
    if (index < 9) {
      setIndex(index => index + 1);
    } else {
      alert("finished");
    }
  };

  return (
    <div className="App">
      <div>{index + 1}/10</div>
      {questions[index] && <Question data={questions[index]} />}
      <button onClick={() => handleNext()}>{index === 9 ? "Finish" : "Next"}</button>
    </div>
  );
}

export default App;

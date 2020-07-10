import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";
import Progress from "./components/Progress";

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [finish, setFinish] = useState(false);

  const fetchQuestions = () => {
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
        setIndex(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (index < 9) {
      setIndex(index => index + 1);
    } else {
      setFinish(true);
    }
  };

  const handleRestart = () => {
    fetchQuestions();
    setFinish(false);
  };

  return (
    <div className="App">
      <Progress indexNumber={index} />
      {questions[index] && <Question indexNumber={index + 1} data={questions[index]} />}
      <button className="button-primary" onClick={() => handleNext()}>
        {index === 9 ? "Finish" : "Next"}
      </button>
      {finish && (
        <button className="button-primary" onClick={() => handleRestart()}>
          Restart
        </button>
      )}
    </div>
  );
}

export default App;

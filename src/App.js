import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";
import Progress from "./components/Progress";
import { backgroundColors } from "./constants/colors";
import { Shuffle } from "./utils/Helpers";

const shuffledColors = Shuffle(backgroundColors);

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [finish, setFinish] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = () => {
    setLoading(true);
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
        setCount(0);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNext = isCorrect => {
    console.log(isCorrect);
    if (index < 9) {
      setIndex(index => index + 1);
      if (isCorrect) {
        setCount(count => count + 1);
      }
    } else {
      setFinish(true);
      if (isCorrect) {
        setCount(count => count + 1);
      }
    }
  };

  const handleRestart = () => {
    fetchQuestions();
    setFinish(false);
  };

  const renderMain = () => {
    if (finish) {
      return (
        <div className="summary-container">
          <div className="label">RESULTS</div>
          <div className="summary-count">{count}/10</div>
          <button className="button-restart" onClick={() => handleRestart()}>
            Restart
          </button>
        </div>
      );
    } else {
      return (
        questions[index] && (
          <Question
            handleNext={isCorrect => handleNext(isCorrect)}
            cardColor={shuffledColors[index]}
            indexNumber={index + 1}
            data={questions[index]}
          />
        )
      );
    }
  };

  return (
    <div className="App">
      <Progress indexNumber={index} />
      {loading ? "" : renderMain()}
    </div>
  );
}

export default App;

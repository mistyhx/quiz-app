import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";

function App() {
  const [questions, setQuestions] = useState([]);

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
  return <div className="App">{questions && questions.map((item, index) => <Question key={index} data={item} />)}</div>;
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        //manipulate the data structure
        //{question:.... answers:... selections:....(randomize selections)}
        setQuestions(result.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz App</h1>
      </header>
      {questions && questions.map((item, index) => item.question)}
      <Question />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./index.css";
import { Shuffle } from "../../utils/Helpers";
import { X, Check } from "react-feather";

const Question = ({ data, indexNumber, cardColor, handleNext }) => {
  const { question, answer, selections } = data;
  const [selected, setSelected] = useState("");
  const [options, setOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    //prevent list re-rendering
    const shuffledSelections = Shuffle(selections);
    setOptions(shuffledSelections);
  }, [selections]);

  const defineOptionStatus = val => {
    if (!selected) {
      return "ready-to-select";
    } else if (selected) {
      if (val === selected) {
        return "selected";
      } else {
        return "not-selected";
      }
    }
  };

  const handleSelection = item => {
    setSelected(item);
    if (item === answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const renderFeedback = () => {
    if (selected) {
      if (isCorrect) {
        return (
          <div className="feedback-message">
            <Check />
            <div className="message"> Well done, this is correct</div>
          </div>
        );
      } else {
        return (
          <div className="feedback-message">
            <X />
            <div className="message">Sorry, it is incorrect</div>
          </div>
        );
      }
    }
  };

  const handleOnClick = () => {
    handleNext();
    setSelected("");
  };

  return (
    <div className="question-container" style={{ backgroundColor: cardColor }}>
      <div className="question-data">
        <div className="question">{question}</div>
        <div className="answers">
          {options.map((item, index) => (
            <div key={index} className={defineOptionStatus(item)} onClick={() => handleSelection(item)}>
              {item}
            </div>
          ))}
        </div>
        <div className="feedback">{renderFeedback()}</div>
      </div>
      <div className="question-index">
        {indexNumber < 10 && "0"}
        {indexNumber}
      </div>
      <button className="button-next" onClick={() => handleOnClick()}>
        {indexNumber === 10 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Question;

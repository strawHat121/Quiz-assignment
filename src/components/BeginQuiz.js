import React, { useState } from "react";
import style from "./StartQuiz.module.css";
import Quiz from "./Quiz";
import Result from "./Result";

const BeginQuiz = (props) => {
  const inputConfig = {
    questions: {
      config: {
        type: "number",
        placeholder: "Questions",
        required: true,
      },
      value: "",
      labelText: "Enter number of questions:",
      isValid: false,
    },
    range: {
      config: {
        type: "number",
        placeholder: "Range",
        required: true,
      },
      value: "",
      labelText: "Enter operand Range(starting from 1):",
      isValid: false,
    },
  };

  const [getInputConfig, setInputConfig] = useState(inputConfig);
  const [canStartQuiz, setStartQuiz] = useState(false);
  const [questions, updateQuestions] = useState([]);
  const [qsnNumber, setQsnNumber] = useState(1);
  const [isQuizFinished, setQuizFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const startQuizHandler = (event) => {
    event.preventDefault();
    setStartQuiz(true);
  };

  const textChangeHandler = (event, element) => {
    const value = event.target.value;
    const updatedConfig = { ...getInputConfig[element] };
    updatedConfig.value = value;
    checkValidity(element, value);
    setInputConfig((prevState) => ({
      ...prevState,
      [element]: updatedConfig,
    }));
  };

  const checkValidity = (element, value) => {
    if (element === "questions" && value <= 20)
      setInputConfig({
        ...getInputConfig,
        questions: { ...getInputConfig[element], isValid: true },
      });
    else if (element === "range" && value <= 100)
      setInputConfig({
        ...getInputConfig,
        range: { ...getInputConfig[element], isValid: true },
      });
  };

  const submitAnswerHandler = (event, question) => {
    event.preventDefault();
    let correctAns = getCorrectAns(
      Number(question.operand1),
      Number(question.operand2),
      question.operator
    );
    if (correctAns === Number(question.userAns))
      setFinalScore((prev) => prev + 1);
    const qsn = {
      ...question,
      correctAns,
      qsnNumber,
    };
    if (Number(qsnNumber) === Number(getInputConfig.questions.value))
      setQuizFinished(true);
    setQsnNumber((prev) => prev + 1);
    updateQuestions((prev) => {
      prev.push(qsn);
      return prev;
    });
  };

  const getCorrectAns = (operand1, operand2, operator) => {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return Math.floor(operand1 / operand2);
      default:
        return 0;
    }
  };

  const operand1 = Math.floor(Math.random() * getInputConfig.range.value) + 1;
  const operand2 = Math.floor(Math.random() * getInputConfig.range.value) + 1;
  const operatorArr = ["+", "-", "*", "/"];
  const operatorIndex = Math.floor(Math.random() * operatorArr.length);

  return (
    <div className={style.Form}>
      {canStartQuiz & !isQuizFinished ? (
        <Quiz
          operand1={operand1}
          operand2={operand2}
          operator={operatorArr[operatorIndex]}
          submitAnswer={submitAnswerHandler}
          qsnNumber={qsnNumber}
        />
      ) : isQuizFinished ? (
        <Result
          questions={questions}
          finalScore={finalScore}
          totalQsns={getInputConfig.questions.value}
        />
      ) : (
        <form onSubmit={startQuizHandler}>
          {Object.keys(getInputConfig).map((element) => (
            <div key={element} className={style.InputDiv}>
              <p>{getInputConfig[element].labelText}</p>
              <input
                {...getInputConfig[element].config}
                value={getInputConfig[element].value}
                onChange={(event) => textChangeHandler(event, element)}
              />
            </div>
          ))}
          <br />
          <br />
          <br />
          <br />
          <button>Start Quiz</button>
        </form>
      )}
    </div>
  );
};

export default BeginQuiz;

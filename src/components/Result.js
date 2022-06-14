import React from "react";

const Result = (props) => {
  return (
    <div>
      <h2>Final Score: {`${props.finalScore}/${props.totalQsns}`}</h2>
      <br />
      <br />
      {props.questions.map((question) =>
        Number(question.correctAns) === Number(question.userAns) ? (
          <div>
            <b>Question {question.questionNumber}:</b>
            <p>{`${question.operand1} ${question.operator} ${question.operand2} = ${question.userAns}`}</p>
          </div>
        ) : (
          <div>
            <b>Question {question.questionNumber}:</b>
            <p
              style={{ background: "red" }}
            >{`${question.operand1} ${question.operator} ${question.operand2} = ${question.userAns}`}</p>
            <p>Correct Answer: {question.correctAns}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Result;

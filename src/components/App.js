import React from "react";
import style from "./App.module.css";
import BeginQuiz from "./BeginQuiz";

function App() {
  return (
    <div className={style.Body}>
      <BeginQuiz />
      <hr />
      <BeginQuiz />
    </div>
  );
}

export default App;

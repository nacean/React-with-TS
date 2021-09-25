import React, { useRef } from "react";
import "../css/CalculatorResult.css";

function setNumber(number: string) {
  const result = document.getElementsByClassName("Result")[0] as HTMLElement;
  result.innerText = number;
}

function setString(number: string) {
  const progress = document.getElementsByClassName(
    "Progress"
  )[0] as HTMLElement;
  progress.innerText = number;
}

function CalculatorResult() {
  return (
    <div className="UpperBlock">
      <div className="Progress"></div>
      <div className="Result"></div>
    </div>
  );
}

export default CalculatorResult;
export { setNumber, setString };

import React from "react";
import CalculatorButtons from "./component/CalculatorButtons";
import CalculatorResult from "./component/CalculatorResult";
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <CalculatorResult />
      <CalculatorButtons />
    </div>
  );
}

export default App;

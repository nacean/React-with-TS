import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CalculatorButtons from "../src/component/CalculatorButtons";
import CalculatorResult from "../src/component/CalculatorResult";

describe("Calculator Test", () => {
  const ButtonComponent = render(<CalculatorButtons />);
  const ResultComponent = render(<CalculatorResult />);
  it("Calculator Complete", () => {
    const Button_1 = ButtonComponent.container.querySelector("#1");
    const Button_2 = ButtonComponent.container.querySelector("#2");
    fireEvent.click(Button_1);
    fireEvent.click(Button_2);
    const Result = ResultComponent.container.getElementsByClassName("Result");
    expect(Result).toBe("12");
  });
});

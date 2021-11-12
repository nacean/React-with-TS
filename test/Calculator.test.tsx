import React from "react";
import { render, screen } from "@testing-library/react";
import CalculatorButtons from "../src/component/CalculatorButtons";
import CalculatorResult from "../src/component/CalculatorResult";
import userEvent from "@testing-library/user-event";

describe("Calculator Test", () => {
  test("Calculator Complete", () => {
    render(
      <div>
        <CalculatorButtons />
        <CalculatorResult />
      </div>
    );

    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("2"));
    userEvent.click(screen.getByText("="));

    expect(screen.getByText("3").innerText).toBe("3");
  });
});

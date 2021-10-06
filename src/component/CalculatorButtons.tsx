import React, { useState, useRef } from "react";
import "../css/CalculatorButtons.css";
import { setNumber, setString } from "./CalculatorResult";
import firebase from "../firebase";

function CalculatorButtons() {
  const [newNumber, setnewNumber] = useState(0);
  const [CalculatedNumbers, setCalculatedNumbers] = useState([0]);
  const [CalculatedString, setCalculatedString] = useState("");
  const [LastCalc, setLastCalc] = useState("+");
  // const [DBArray, setDBArray] = useState<Array<object>>([]); //Array<object>를 명시해줘야 never가 아님

  const PastDivRef = useRef<HTMLUListElement>(null);

  function PutInList(
    CalculatedString: string,
    CalculatedNumbers: string,
    id: string
  ) {
    const newDB = document.createElement("li");
    const newDelete = document.createElement("button");
    newDB.id = id;
    newDB.innerText = `[Calculate Process : ${CalculatedString}] [Result : ${CalculatedNumbers}]`;
    newDelete.innerText = "X";
    newDelete.id = id;
    newDelete.onclick = () => {
      DeleteDB(id);
    };
    newDB.appendChild(newDelete);
    // setDBArray([...DBArray, newDBObject]);
    PastDivRef.current?.appendChild(newDB);
  }

  async function getCollection() {
    const databases = firebase.collection(firebase.db, "DBPractice");
    const snapshot = await firebase.getDocs(databases);
    snapshot.forEach((doc) => {
      console.log(typeof doc.data());
      PutInList(
        doc.data().CalculatedString,
        doc.data().CalculatedNumbers,
        doc.id
      );
    });
  }

  async function AddtoDB() {
    let Addednum = 0;
    CalculatedNumbers.forEach((number) => (Addednum += number));
    const databases = firebase.collection(firebase.db, "DBPractice");

    const AddDB = await firebase.addDoc(databases, {
      CalculatedNumbers: String(Addednum),
      CalculatedString: CalculatedString + String(newNumber),
    });
    PutInList(CalculatedString + String(newNumber), String(Addednum), AddDB.id);
  }

  async function DeleteDB(id: string) {
    const Deleteli = document.getElementById(id);
    Deleteli?.remove();

    const databases = firebase.collection(firebase.db, "DBPractice");
    await firebase.deleteDoc(firebase.doc(databases, id));
  }

  function ClickNumberButton(props: any) {
    const PickNumber = props.target.innerText;
    if (newNumber * 10 + parseInt(PickNumber) === 0) {
      alert("cannot divide with 0");
      return;
    }
    setnewNumber(newNumber * 10 + parseInt(PickNumber));
    setNumber(String(newNumber * 10 + parseInt(PickNumber)));
  }

  function ClickReturnButton() {
    setnewNumber(0);
    setCalculatedNumbers([]);
    setCalculatedString("");
    setNumber("0");
    setString("");
    setLastCalc("+");
  }

  function ClickResultButton() {
    const ResultNumber = GetNumber();
    let Addednum = 0;
    ResultNumber.forEach((number) => (Addednum += number));
    setNumber(String(Addednum));
    setString(CalculatedString + String(newNumber));
  }

  function ClickCalculateButton(NewCalc: string) {
    GetNumber();
    setCalculatedString(CalculatedString + newNumber + NewCalc);
    setString(CalculatedString + newNumber + NewCalc);
    setnewNumber(0);
    setLastCalc(NewCalc);
  }

  getCollection();

  function GetNumber(): Array<number> {
    let TempNumber = CalculatedNumbers;
    switch (LastCalc) {
      case "+":
        TempNumber = [...TempNumber, newNumber];
        setCalculatedNumbers(TempNumber);
        break;

      case "-":
        TempNumber = [...TempNumber, 0 - newNumber];
        setCalculatedNumbers(TempNumber);
        break;

      case "*":
        TempNumber[TempNumber.length - 1] *= newNumber;
        setCalculatedNumbers(TempNumber);
        break;

      case "/":
        TempNumber[TempNumber.length - 1] /= newNumber;
        setCalculatedNumbers(TempNumber);
        break;

      default:
        setCalculatedNumbers(CalculatedNumbers);
    }

    return TempNumber;
  }

  return (
    <>
      <div className="Buttons">
        <div className="NumberButtons">
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            1
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            2
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            3
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            4
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            5
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            6
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            7
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            8
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            9
          </button>
          <button className="Button" onClick={(props) => ClickReturnButton()}>
            C
          </button>
          <button
            className="Button"
            onClick={(props) => ClickNumberButton(props)}
          >
            0
          </button>
          <button className="Button" onClick={() => ClickResultButton()}>
            =
          </button>
        </div>
        <div className="ContentButtons">
          <button className="Button" onClick={() => ClickCalculateButton("+")}>
            +
          </button>
          <button className="Button" onClick={() => ClickCalculateButton("-")}>
            -
          </button>
          <button className="Button" onClick={() => ClickCalculateButton("*")}>
            *
          </button>
          <button className="Button" onClick={() => ClickCalculateButton("/")}>
            /
          </button>
        </div>
      </div>
      <div className="PastResultButton">
        <button className="DBAddButton" onClick={() => AddtoDB()}>
          Add to DataBase
        </button>
      </div>
      <ul className="PastResults" ref={PastDivRef}></ul>
    </>
  );
}

export default CalculatorButtons;

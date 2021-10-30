import React, { useState, useEffect } from "react";
import "../css/CalculatorButtons.css";
import { setNumber, setString } from "./CalculatorResult";
import firebase from "../firebase";

function CalculatorButtons() {
  const [newNumber, setnewNumber] = useState(0);
  const [calculatedNumbers, setCalculatedNumbers] = useState([0]);
  const [calculatedString, setCalculatedString] = useState("");
  const [LastCalc, setLastCalc] = useState("+");
  const [calculatedList, setCalculatedList] = useState<{
    id: string, 
    process: string, 
    result: string, 
    deleteHook: () => void 
  }[]>([]);

  function PutInList(
    CalculatedString: string,
    CalculatedNumbers: string,
    id: string
  ) {
    setCalculatedList([
      ...calculatedList,
      {
        id,
        process:CalculatedString,
        result: CalculatedNumbers,
        deleteHook: () => { DeleteDB(id)}
      }
    ])
  }

  const getCollection = async () => {
    // 처음 시작 시, 초기화
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
  };

  useEffect(() => {
    //eslint warning으로 인해 disable
    getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function AddtoDB() {
    //DB에 저장
    let Addednum = 0;
    calculatedNumbers.forEach((number) => (Addednum += number));
    const databases = firebase.collection(firebase.db, "DBPractice");

    const AddDB = await firebase.addDoc(databases, {
      CalculatedNumbers: String(Addednum),
      CalculatedString: calculatedString + String(newNumber),
    });
    PutInList(calculatedString + String(newNumber), String(Addednum), AddDB.id);
  }

  async function DeleteDB(id: string) {
    //DB에서 삭제
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
    setString(calculatedString + String(newNumber));
  }

  function ClickCalculateButton(NewCalc: string) {
    GetNumber();
    setCalculatedString(calculatedString + newNumber + NewCalc);
    setString(calculatedString + newNumber + NewCalc);
    setnewNumber(0);
    setLastCalc(NewCalc);
  }

  function GetNumber(): Array<number> {
    let TempNumber = calculatedNumbers;
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
        setCalculatedNumbers(calculatedNumbers);
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
      <ul className="PastResults">
        {calculatedList.map(calculated => 
          <li id={calculated.id}>
          [Calculate Process : {calculated.process}] [Result : {calculated.result}]
            <button id={calculated.id} onClick={calculated.deleteHook}>
              X
            </button>
          </li>
        )}
      </ul>
    </>
  );
}

export default CalculatorButtons;

import React, { useState } from "react";
import type { User } from "firebase/auth";
import CalculatorButtons from "./component/CalculatorButtons";
import CalculatorResult from "./component/CalculatorResult";
import LoginButton from "./component/LoginButton";
import LogoutButton from "./component/LogoutButton";
import "./css/App.css";

function App() {
  const [state, setState] = useState<{
    token: string | null;
    user: User | null;
    isLoggedIn: true | false;
  }>({
    token: JSON.parse(localStorage.getItem("token") ?? "{}") ?? null,
    user: JSON.parse(localStorage.getItem("user") ?? "{}") ?? null,
    isLoggedIn: false,
  });

  // App state에 token과 user, login여부를 설정한다.
  const setAuth = ({
    token,
    user,
    isLoggedIn,
  }: {
    token: string | null;
    user: User | null;
    isLoggedIn: true | false;
  }) => {
    setState({
      token,
      user,
      isLoggedIn,
    });

    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <div className="App">
      <CalculatorResult />
      <CalculatorButtons />
      {state.isLoggedIn === true ? (
        <LogoutButton
          onLogout={() =>
            setAuth({ token: null, user: null, isLoggedIn: false })
          }
        ></LogoutButton>
      ) : (
        <LoginButton onLogin={setAuth}></LoginButton>
      )}
    </div>
  );
}

export default App;

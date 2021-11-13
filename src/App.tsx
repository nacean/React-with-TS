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
    token: null,
    user: null,
    isLoggedIn: false,
  });

  function DeleteCookies() {
    setAuth({ token: null, user: null, isLoggedIn: false });
    document.cookie = `token=;user=; expires=Thu, 18 Dec 2013 12:00:00 GMT;`;
  }

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
    document.cookie = `token=${token};user=${user};`;
  };

  return (
    <div className="App">
      {state.isLoggedIn === true || document.cookie.length !== 0 ? (
        <LogoutButton onLogout={() => DeleteCookies()}></LogoutButton>
      ) : (
        <LoginButton onLogin={setAuth}></LoginButton>
      )}
      <div className="CalculatorApp">
        <CalculatorResult />
        <CalculatorButtons />
      </div>
    </div>
  );
}

export default App;

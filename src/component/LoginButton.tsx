import type { User } from "firebase/auth";
import React from "react";
import { googleLogin } from "../googleAuthentication";

const LoginButton = ({
  onLogin,
}: {
  onLogin: ({
    token,
    user,
    isLoggedIn,
  }: {
    token: string | null;
    user: User | null;
    isLoggedIn: true | false;
  }) => void;
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    // 버튼에 기본으로 지정되어있는 이벤트를 실행하지 않습니다.
    e.preventDefault();
    // 이벤트가 다른 DOM 객체로 전파되지 않도록 막습니다.
    e.stopPropagation();

    // await: 구글 로그인 팝업을 띄우고 결과값을 받아올 때까지 대기합니다.
    const result = await googleLogin();
    if (result === null) {
      console.error("login failed");
      return;
    }
    const { token, user } = result;

    // onLogin 함수에 token과 user값을 전달해줍니다.
    onLogin({
      token: token ?? null,
      user: user ?? null,
      isLoggedIn: true ?? false,
    });
    console.log(token, user);
  };

  return <button className="loginBtn" onClick={handleClick}>sign in with google</button>;
};

export default LoginButton;

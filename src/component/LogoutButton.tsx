// LogoutButton.tsx
import React from "react";
import { googleLogout } from "../googleAuthentication";

const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // 구글 로그아웃을 진행합니다.
    googleLogout();
    // onLogout 콜백을 실행합니다.
    onLogout();
  };

  return <button onClick={handleClick}>logout</button>;
};

export default LogoutButton;

import React from "react";
import Button from "./form/Button";

interface Props {
  isLogedin: boolean;
  setIsLogedin: Function;
}

const Header = ({ setIsLogedin, isLogedin }: Props) => {
  const onLogoutSuccess = () => {
    setIsLogedin(false);
    window.localStorage.removeItem("accessToken");
  };

  const userName = window.localStorage.getItem("userName")
    ? window.localStorage.getItem("userName")
    : "";

  return (
    <div className="welcome-text">
      {isLogedin && (
        <span>
          Welcome - {userName} |{" "}
          <Button label="Logout" onClick={onLogoutSuccess} varient="link" />
        </span>
      )}
    </div>
  );
};

export default Header;

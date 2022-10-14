import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./form/Button";
import { statesModal } from "../../store/todoReducer";
import { loginTodoAction } from "../../store";
const Header = () => {
  const { isLogedin } = useSelector((state: statesModal) => state);
  const userData = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") || "{}")
    : "";
  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(loginTodoAction(false));
    window.localStorage.removeItem("accessToken");
  };
  return (
    <div className="welcome-text">
      {isLogedin && userData.name && (
        <span>
          Welcome - {userData.name} |{" "}
          <Button label="Logout" onClick={onLogoutSuccess} varient="link" />
        </span>
      )}
    </div>
  );
};

export default Header;

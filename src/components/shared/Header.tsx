import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./form/Button";
import { statesModal } from "../../store/todoReducer";
import { loginTodoAction } from "../../store";
const Header = () => {
  const { isLogedin, userName } = useSelector((state: statesModal) => state);
  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(loginTodoAction(false));
    window.localStorage.removeItem("accessToken");
  };
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

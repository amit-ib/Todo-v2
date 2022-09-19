import React from "react";
import { ButtonModel } from "../../../models/button.models";

const Button = (props: ButtonModel) => {
  return (
    <button
      type={props.type}
      className={`${props.className ? props.className : ""}`}
      onClick={props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {props.label}
    </button>
  );
};

export default Button;
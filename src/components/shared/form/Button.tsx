import React from "react";
import { ButtonModel } from "../../../models/button.models";
import Loader from "../Loader";

const Button = (props: ButtonModel) => {
  return (
    <button
      type={props.type}
      className={`${props.className ? props.className : ""}${
        props.varient ? "btn " + "btn-" + props.varient : ""
      } ${props.size ? "btn-" + props.size : ""}`}
      onClick={props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {props.loading ? <Loader iconOnly={true} /> : props.label}
    </button>
  );
};

export default Button;

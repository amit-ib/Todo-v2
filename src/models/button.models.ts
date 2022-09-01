import { MouseEventHandler } from "react";

export interface ButtonModel {
  label?: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler;
  className?: string;
}

export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
}

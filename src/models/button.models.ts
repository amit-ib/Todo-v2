import { MouseEventHandler } from "react";

export interface ButtonModel {
  label?: string;
  type?: "button" | "submit";
  varient?: "primary" | "secondary" | "link";
  size?: "lg" | "sm" | "block";
  onClick?: MouseEventHandler;
  className?: string;
  disabled?: boolean;
}

export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
}

export enum ButtonStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  LINK = "link",
}

export enum ButtonSize {
  LARGE = "lg",
  SMALL = "sm",
  BLOCK = "block",
}

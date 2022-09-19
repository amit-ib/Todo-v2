import { MouseEventHandler } from "react";

export interface ButtonModel {
  label?: string;
  type?: 'button' | 'submit';
  styles?:'primary' | 'secondary' | 'link';
  onClick?: MouseEventHandler;
  className?: string;
}

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export enum ButtonStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  LINK = 'link',
}
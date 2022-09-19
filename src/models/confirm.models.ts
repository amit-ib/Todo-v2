import { MouseEventHandler } from "react";

export interface ConfirmModel {
  title: string;
  text:string;
  show:boolean;
  onHide:Function;
  buttonAction?:Function
}
import { TodoModal } from "./todo.model";

export interface ConfirmModel {
  title: string;
  text: string;
  show: boolean;
  onHide: Function;
  buttonAction: Function;
  todo?: TodoModal;
  buttonLabel: string;
}

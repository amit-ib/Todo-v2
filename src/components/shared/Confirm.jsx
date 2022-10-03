import Modal from "react-bootstrap/Modal";
import { ConfimModel } from "../../models/confirm.models";
import Button from "./form/Button";

const BsModal = (props: ConfimModel) => {
  const cancelButtonHandler = () => {
    props.onHide();
  };
  const actionButtonHandler = () => {
    props.buttonAction();
  };

  return (
    <Modal show={props.show} onHide={cancelButtonHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.text}</Modal.Body>
      <Modal.Footer>
        <Button
          label="Close"
          varient="secondary"
          onClick={() => cancelButtonHandler()}
        />
        <Button
          label={props.buttonLabel}
          varient="primary"
          onClick={() => actionButtonHandler()}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default BsModal;

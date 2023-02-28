import { Button, Form, Modal } from "react-bootstrap";
import { HexColorPicker } from "react-colorful";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";

function CategoryModal({ isCreating, setIsCreating, category, show, setShow }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState();
  const authContext = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      name,
      color,
    };
    setErrors(null);
    authContext.addCategory(payload).then((response) => {
      if (response === true) {
        handleClose();
      } else {
        setErrors(response);
      }
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    let payload = {
      id: category.id,
      name,
      color,
    };
    setErrors(null);
    authContext.updateCategory(payload).then((response) => {
      if (response === true) {
        handleClose();
      } else {
        setErrors(response);
      }
    });
  };

  const handleClose = () => {
    setErrors(null);
    setIsCreating(false);
    setShow(false);
  };

  useEffect(() => {
    setColor(
      !isCreating && category && category.color ? category.color : "#FFFFFF"
    );

    setName(
      !isCreating && category && category.name ? category.name : ""
    );
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {!isCreating && category && category.id
            ? "Modifica Categoria"
            : "Aggiungi Categoria"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={"row mt-3"}>
          <div className={"col-10 offset-1"}>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Nome categoria</Form.Label>
              <Form.Control
                placeholder="Nome categoria"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              {errors && errors.name && (
                <p className={"text-danger"}> {errors.name[0]}</p>
              )}
            </Form.Group>
          </div>
        </div>
        <div className={"row mt-3"}>
          <div className={"col-10 offset-1"}>
            <Form.Label>Colore categoria</Form.Label>
            <HexColorPicker
              color={color}
              defaultValue={
                !isCreating && category && category.color ? category.color : ""
              }
              onChange={setColor}
              className={"mx-auto"}
            />
            {errors && errors.color && (
              <p className={"text-danger"}> {errors.color[0]}</p>
            )}
          </div>
        </div>
        <div className={"row mt-3"}></div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
        <Button
          variant="success"
          onClick={
            !isCreating && category && category.id
              ? handleSubmitEdit
              : handleSubmit
          }
        >
          {!isCreating && category && category.id
              ? "Modifica"
              : "Aggiungi"}        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;

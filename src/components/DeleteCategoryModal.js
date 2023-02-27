import { Button, Modal } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function DeleteCategoryModal({
  selectedCategoryId,
  setCategoryId,
  show,
  setShow,
}) {
  const authContext = useContext(AuthContext);

  let hasMov = false;
  authContext.movements.map((mov) => {
    if (mov.category_id == selectedCategoryId) {
      hasMov = true;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    authContext.deleteCategory(selectedCategoryId).then((response) => {
      if (response === true) {
        setCategoryId("");
      }
      handleClose();
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancella Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={"row mt-3"}>
          <div className={"col-10 offset-1"}>
            <div className={"d-flex flex-column align-items-center"}>
              {hasMov ? (
                <p className={"mx-auto"}>
                  Impossibile eliminare questa categoria. Eliminare i movimenti
                  collegati.
                </p>
              ) : (
                <p className={"mx-auto"}>Vuoi eliminare questa categoria?</p>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
        {!hasMov ? (
          <Button variant="danger" onClick={handleSubmit}>
            Elimina
          </Button>
        ) : (
          <></>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCategoryModal;
import { Button, Modal } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function DeleteCategoryModal({ setCategoryId, show, setShow, categoryId }) {
  const authContext = useContext(AuthContext);

  let category = authContext.categories.find((cat) => {
    return categoryId == cat.id;
  });

  let hasMov = false;
  authContext.movements.map((mov) => {
    if (mov.category_id == category?.id) {
      hasMov = true;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    authContext.deleteCategory(category?.id).then((response) => {
      if (response === true) {
        setCategoryId(0);
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
          <div className={"col-12"}>
            <div className={"d-flex flex-column align-items-center"}>
              {hasMov ? (
                <p className={"mx-auto"}>
                  Impossibile eliminare questa categoria. Eliminare i movimenti
                  collegati.
                </p>
              ) : (
                <p className={"mx-auto"}>
                  Vuoi eliminare la categoria <b>{category?.name}</b> ?
                </p>
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

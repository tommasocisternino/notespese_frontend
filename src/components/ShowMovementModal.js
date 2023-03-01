import { Button, Modal } from "react-bootstrap";
function ShowMovementModal({
  show,
  setShow,
  movement,
  setSelectedMovement,
  categories = [],
  handleDelete,
}) {
  const handleClose = () => {
    setShow(false);
    setSelectedMovement(null);
  };

  const findCategory = (cat_id) => {
    let cat = categories.find((cat) => cat.id == cat_id);

    return cat ?? "";
  };

  let category = findCategory(movement.category_id);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Movimento del {movement.date}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={"d-flex flex-row lh-1"}>
          <label className={"fw-bold"}>Tipo di movimento:</label>
          <p className={"ms-2"}>{movement.value >= 0 ? "ENTRATA" : "USCITA"}</p>
        </div>
        <div className={"d-flex flex-row lh-1"}>
          <label className={"fw-bold"}>Importo:</label>
          <p className={"ms-2"}>
            {Math.abs(movement.value)}
            {movement.currency}
          </p>
        </div>
        <div className={"d-flex flex-row lh-1"}>
          <label className={"fw-bold"}>Categoria:</label>
          <div
            className={"category-color-square mx-1"}
            style={{ backgroundColor: category.color }}
          />
          <p className={"ms-2"}>{category.name}</p>
        </div>
        <div className={"row mt-3 lh-1"}>
          <div className={"col-12"}>
            <label className={"fw-bold"}>Note:</label>
            <p>{movement.note}</p>
          </div>
        </div>
        <div className={"row mt-3 lh-1"}>
          <div className={"col-4 offset-4"}>
            <Button
              variant={"danger"}
              onClick={() => {
                handleDelete();
              }}
            >
              ELIMINA
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ShowMovementModal;

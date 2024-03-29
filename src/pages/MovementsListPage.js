import { useContext, useState } from "react";
import { ReactComponent as EmptyIcon } from "../assets/icons/empty.svg";

import ShowMovementModal from "../components/ShowMovementModal";
import MovementCard from "../components/MovementCard";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function MovementsListPage({ movements }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);

  let authContext = useContext(AuthContext);
  let categories = authContext.categories;

  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };

  const openModal = (mov) => {
    setShowModal(true);
    setSelectedMovement(mov);
  };

  const handleDelete = () => {
    setShowModal(false);
    setSelectedMovement(null);
    authContext.setIsLoading(true);
    authContext
      .deleteMovement(selectedMovement.id)
      .then(() => {
        setShowModal(false);
      })
      .finally(() => {
        authContext.setIsLoading(false);
      });
  };

  const getMovementWithColor = (mov) => {
    let cat = authContext.categories.find((cat) => cat.id == mov.category_id);
    if (cat) {
      mov.category_color = cat.color;
      return mov;
    }
    return mov;
  };

  return (
    <>
      {selectedMovement && (
        <ShowMovementModal
          show={showModal}
          setShow={setShowModal}
          movement={selectedMovement}
          setSelectedMovement={setSelectedMovement}
          categories={categories}
          handleDelete={handleDelete}
        />
      )}
      <div className={"container container-app overflow-scroll pb-3"}>
        <div className={"row"}>
          <div className={"col-12"}>
            <div className={"row mt-5 pb-5 text-center"}>
              <h1>LISTA MOVIMENTI</h1>
            </div>
            <div className={"row mt-3"}>
              <div className={"col-10 offset-1"}>
                <hr />
                {movements && movements.length > 0 ? (
                  movements.map((mov, index) => {
                    return (
                      <MovementCard
                        key={"mov_" + index}
                        movement={getMovementWithColor(mov)}
                        openModal={openModal}
                      />
                    );
                  })
                ) : (
                  <div
                    className={
                      "d-flex flex-column align-items-center my-1 px-3 pt-5 mt-5"
                    }
                  >
                    <EmptyIcon width={64} height={64} />
                    <p className={"mx-auto"}>Nessun movimento registrato</p>
                    <Button
                      variant={"primary"}
                      className={"mt-3"}
                      onClick={() => {
                        goTo("/add");
                      }}
                    >
                      Aggiungi
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovementsListPage;

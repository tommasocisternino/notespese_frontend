import {useContext, useState} from "react";

import ShowMovementModal from "../components/ShowMovementModal";
import MovementCard from "../components/MovementCard";
import AuthContext from "../contexts/AuthContext";

function MovementsListPage({movements}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedMovement, setSelectedMovement] = useState(null);

    let authContext = useContext(AuthContext);
    let categories = authContext.categories;

    const openModal = (mov) => {
        setShowModal(true);
        setSelectedMovement(mov)
    }

    return (
        <>
            {selectedMovement && <ShowMovementModal show={showModal} setShow={setShowModal} movement={selectedMovement} setSelectedMovement={setSelectedMovement} categories={categories}/>}
            <div className={"container h-100 overflow-scroll pb-5"}>
                <div className={"row mt-5 text-center"}>
                    <h1>LISTA MOVIMENTI</h1>
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-8 offset-2"}>
                        {movements && movements.length > 0 && movements.map((mov, index) => {
                            return (<MovementCard key={"mov_" + index} movement={mov} openModal={openModal}/>);
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovementsListPage;

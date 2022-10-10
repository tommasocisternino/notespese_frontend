import {useEffect, useState, useContext} from "react";
import MovementsService from "../services/movements";

import {ReactComponent as CircleIcon} from "../assets/icons/circle-fill.svg"
import AuthContext from "../contexts/AuthContext";
import CategoryService from "../services/categories";
import ShowMovementModal from "../components/ShowMovementModal";

function MovementsListPage() {
    const [movements, setMovements] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovement, setSelectedMovement] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.setIsLoading(true);
        MovementsService.index().then((response) => {
            setMovements(response.data.movements);
        }).catch(() => {
            setMovements([]);
        }).finally(() => {
            authContext.setIsLoading(false);
        })

        CategoryService.index().then((response) => {
            setCategories(response.data.categories);
        }).catch(() => {
            setMovements([]);
        });
    }, []);

    const openModal = (mov) => {
        setShowModal(true);
        setSelectedMovement(mov)
    }

    return (
        <>
            {selectedMovement && <ShowMovementModal show={showModal} setShow={setShowModal} movement={selectedMovement} setSelectedMovement={setSelectedMovement}/>}
            <div className={"container h-100 overflow-scroll pb-5"}>
                <div className={"row mt-5 text-center"}>
                    <h1>LISTA MOVIMENTI</h1>
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-8 offset-2"}>
                        {movements.length > 0 && movements.map((mov) => {
                            return (
                                <div className={"d-flex flex-row align-items-center card shadow my-1 p-3 lh-1"}
                                     onClick={() => openModal(mov)}>
                                    <CircleIcon className={mov.value >= 0 ? 'text-success' : "text-danger"}/>
                                    <label className={"mx-auto"}>{mov.value}€</label>
                                    <label className={"mx-auto"}>{mov.date}</label>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovementsListPage;

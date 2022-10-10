import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import moment from "moment";
import MovementService from "../services/movements"
import AddCategoryModal from "../components/AddCategoryModal";
import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";

function ListaMovimentiPage() {

    const [value, setValue] = useState();
    const [type, setType] = useState("+");
    const [category, setCategory] = useState();
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [modalShow, setModalShow] = useState(false);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.fetchCategories();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        let payload = {
            value: type === "+" ? +Math.abs(value) : -Math.abs(value),
            category_id: category,
            date
        }

        MovementService.create(payload).then((response) => {
            if (response.status === 201) {
                authContext.notify("Movimento aggiunto correttamente", "text-success");
            }
        });
    }

    return (
        <div className={"container h-100"}>
            <AddCategoryModal show={modalShow} setShow={setModalShow}/>
            <div className={"row"}>
                <div className={"col-12"}>
                    <Form onSubmit={handleSubmit}>
                        <div className={"row mt-5 pb-5 text-center"}>
                            <h1>AGGIUNGI MOVIMENTO</h1>
                        </div>
                        <div className={"row mt-5"}>
                            <div className={"col-10 offset-1"}>
                                <div className={"row justify-content-around d-flex"}>
                                    <div className={"col-10"}>
                                        <Form.Label>
                                            Tipo di movimento
                                        </Form.Label>
                                        <Form.Select size="sm" onChange={(e) => {
                                            setType(e.target.value)
                                        }}>
                                            <option value={"+"}>ENTRATA</option>
                                            <option value={"-"}>USCITA</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={"col-10 offset-1"}>
                                <div className={"row justify-content-around d-flex"}>
                                    <div className={"col-10"}>
                                        <Form.Label>
                                            Categoria<Button variant={"primary"} size={"sm"} type={"button"}
                                                             className={"mx-2"} onClick={() => {
                                            setModalShow(true)
                                        }}>+</Button>
                                        </Form.Label>
                                        <AuthContext.Consumer>
                                            {
                                                ({categories}) => (categories &&
                                                    <Form.Select size="sm" onChange={(e) => {
                                                        setCategory(e.target.value)
                                                    }}>
                                                        {categories.map((cat) => {
                                                            return <option value={cat.id}>{cat.name}</option>
                                                        })}
                                                    </Form.Select>)
                                            }
                                        </AuthContext.Consumer>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={"col-5 offset-1"}>
                                <Form.Group controlId="formBasicValue">
                                    <Form.Label>Data movimento</Form.Label>
                                    <Form.Control type="date" placeholder="DATA" value={date} onChange={(e) => {
                                        setDate(e.target.value)
                                    }}/>
                                </Form.Group>
                            </div>
                            <div className={"col-4 offset-1"}>
                                <Form.Group controlId="formBasicValue">
                                    <Form.Label>Importo</Form.Label>
                                    <Form.Control type="number" placeholder="IMPORTO" onChange={(e) => {
                                        setValue(e.target.value)
                                    }}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={"col-10 offset-1"}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control as="textarea" rows={4}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className={"row mt-5"}>
                            <Button variant={"success"} className={"col-4 offset-4"} type={"submit"}>SALVA</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
        ;
}

export default ListaMovimentiPage;

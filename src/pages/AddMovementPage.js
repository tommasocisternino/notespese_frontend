import {useContext} from "react";
import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import moment from "moment";
import AddCategoryModal from "../components/AddCategoryModal";
import AuthContext from "../contexts/AuthContext";
import FormControl from "../components/Form/Input/FormControl";

function ListaMovimentiPage() {

    const [value, setValue] = useState();
    const [type, setType] = useState("-");

    const [categoryId, setCategoryId] = useState(null);
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [note, setNote] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [errors, setErrors] = useState(null);

    const authContext = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            category_id: categoryId,
            date,
            note
        }

        if (value) {
            if (type === "+") {
                payload.value = Math.abs(value);
            } else {
                payload.value = -Math.abs(value);
            }
        }

        setErrors(null);
        setErrors(await authContext.addMovement(payload));
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
                                        <Form.Select size="sm" onChange={(e) => {setType(e.target.value)}} defaultValue={"-"}>
                                            <option value={"-"}>USCITA</option>
                                            <option value={"+"}>ENTRATA</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={"col-10 offset-1"}>
                                <div className={"row justify-content-around d-flex"}>
                                    <div className={"col-10"}>
                                        <Form.Label>Categoria
                                            <Button variant={"primary"} size={"sm"} type={"button"} className={"mx-2"} onClick={() => {setModalShow(true)}}>+</Button>
                                        </Form.Label>
                                        <AuthContext.Consumer>
                                            {
                                                ({categories}) => (categories &&
                                                    <Form.Select size="sm" onChange={(e) => {
                                                        setCategoryId(e.target.value)
                                                    }} defaultValue={null}>
                                                        <option value={null} key={"option_cat_null"}>Seleziona una categoria...</option>
                                                        {categories.map((cat, index) => {
                                                            return <option value={cat.id} key={"option_cat_" + index}>{cat.name}</option>
                                                        })}
                                                    </Form.Select>)
                                            }
                                        </AuthContext.Consumer>
                                        {errors && errors.category_id && <p className={"text-danger text-center"}>{errors.category_id[0]}</p>}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={"col-5 offset-1"}>
                                <Form.Group controlId="formBasicValue">
                                    <FormControl changeSetter={setDate} label_text={"Data movimento"} type={"date"} value={date} errors={errors && errors.date ? errors.date : null}/>
                                </Form.Group>
                            </div>
                            <div className={"col-4 offset-1"}>
                                <Form.Group controlId="formBasicValue">
                                    <FormControl changeSetter={setValue} label_text={"Importo"} type={"number"} value={value} placeholder={"IMPORTO"} errors={errors && errors.value ? errors.value : null}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={"col-10 offset-1"}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control as="textarea" rows={4} onChange={(e) => {
                                        setNote(e.target.value)
                                    }}/>
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
    );
}

export default ListaMovimentiPage;

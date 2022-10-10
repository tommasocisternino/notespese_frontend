import {Button, Form, Image, Modal} from "react-bootstrap";
import {HexColorPicker} from "react-colorful";
import {useState, useContext} from "react";
import AuthContext from "../contexts/AuthContext";

function AddCategoryModal({show, setShow}) {
    const [name, setName] = useState();
    const [color, setColor] = useState();
    const [errors, setErrors] = useState();
    const authContext = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            name,
            color
        }
        setErrors(null);
        authContext.addCategory(payload).then((response ) => {
            if (response === true){
                handleClose()
            }else{
                setErrors(response);
            }
        });
    }

    const handleClose = () => {
        setErrors(null);
        setShow(false);
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Aggiungi Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"row mt-3"}>
                    <div className={"col-10 offset-1"}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Nome categoria</Form.Label>
                            <Form.Control placeholder="Nome categoria" type="text" onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                            {errors && errors.name && <p className={"text-danger"}> {errors.name[0]}</p>}
                        </Form.Group>
                    </div>
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-10 offset-1"}>
                        <Form.Label>Colore categoria</Form.Label>
                        <HexColorPicker color={color} onChange={setColor} className={"mx-auto"}/>
                        {errors && errors.color && <p className={"text-danger"}> {errors.color[0]}</p>}
                    </div>
                </div>
                <div className={"row mt-3"}>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Aggiungi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddCategoryModal;

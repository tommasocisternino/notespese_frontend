import Logo from "../components/Logo";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useState} from "react";
import AuthContext from "../contexts/AuthContext";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();
    const goToRoute = (route, state = {}) => {
        navigate(route);
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        let payload = {
            email, password
        };
        setErrors(await authContext.login(payload));
    }

    return (
        <div className="container">
            <div className="col-12">
                <div className={"row pt-5"}>
                    <Logo/>
                </div>
                <div className={"row"}>
                    <Form id={"loginForm"} onSubmit={handleLoginSubmit}>
                        <div className={"col-12"}>
                            <div className={"row mt-5 w-100"}>
                                <Form.Group controlId="formBasicEmail" className={"col-10 mx-auto"}>
                                    <Form.Control type="email" placeholder="Email" onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className={"col-12"}>
                            <div className={"row mt-4 w-100"}>
                                <Form.Group controlId="formBasicPassword" className={"col-10 mx-auto"}>
                                    <Form.Control type="password" placeholder="Password" className={"mb-1"}
                                                  onChange={(e) => {
                                                      setPassword(e.target.value)
                                                  }}/>
                                    <div className={"col-12"}>
                                        <label className={"mx-auto"}>Password dimenticata?</label>
                                        <Link to={"/reset-password"} className={"ml-3"}>Reimpostala</Link>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                        <div className={"col-12"}>
                            <div className={"row mt-3 w-100"}>
                                <Form.Group controlId="formBasicCheckbox" className={"col-10 mx-auto"}>
                                    <Form.Check type="checkbox" label="Ricordami"/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className={"col-12"}>
                            <div className={"row mt-4 w-100"}>
                                <div className={"col-10 mx-auto mb-1"}>
                                    {errors && <p className={"text-danger text-center"}> Login fallito</p>}
                                    <Button className={"w-100 btn btn-primary shadow mx-auto"} type="submit">
                                        Accedi
                                    </Button>
                                </div>
                                <div className={"col-7 offset-1 mb-4"}>
                                    <label className={"mx-auto"}>Non hai un account?</label>
                                    <Link to={"/register"} className={"ml-3"}>Registrati</Link>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

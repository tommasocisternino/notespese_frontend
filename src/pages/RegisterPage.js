import Logo from "../components/Logo";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import {ReactComponent as InfoIcon} from "../assets/icons/info.svg";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState(null);

  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  const goToRoute = (route, state = {}) => {
    navigate(route);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      email,
      username,
      password,
      password_confirmation: passwordConfirm,
    };
    setErrors(await authContext.register(payload));
  };

  return (
    <div className="container">
      <div className="col-12 col-md-6 offset-md-3">
      <div className={"row pt-5 px-5"}>
        <Logo />
      </div>
      <div className={"row"}>
        <Form id={"loginForm"} onSubmit={handleLoginSubmit}>
          <div className={"col-12"}>
            <div className={"row mt-5 w-100"}>
              <Form.Group
                className={"col-10 mx-auto"}
              >
                <Form.Control
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                {errors && errors.username && (
                  <p className={"text-danger"}> {errors.username[0]}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div className={"col-12"}>
            <div className={"row mt-3 w-100"}>
              <Form.Group
                className={"col-10 mx-auto"}
              >
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {errors && errors.email && (
                  <p className={"text-danger"}> {errors.email[0]}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div className={"col-12"}>
            <div className={"row mt-3 w-100"}>
              <Form.Group
                className={"col-10 mx-auto"}
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className={"mb-1"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="row mt-1">
                  <div className="col-1">
                    <InfoIcon width={12} height={12} />
                  </div>
                  <div className="col-11"><small>La password deve avere una lunghezza minima di 8 caratteri e contenere
                    almeno una lettera maiuscola, una minuscola, un carattere speciale e un numero.</small></div>
                </div>
                {errors && errors.password && (
                  <p className={"text-danger"}> {errors.password[0]}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div className={"col-12"}>
            <div className={"row mt-3 w-100"}>
              <Form.Group
                className={"col-10 mx-auto"}
              >
                <Form.Control
                  type="password"
                  placeholder="Conferma Password"
                  className={"mb-1"}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
                {errors && errors.password_confirmation && (
                  <p className={"text-danger"}>
                    {" "}
                    {errors.password_confirmation[0]}
                  </p>
                )}
              </Form.Group>
            </div>
          </div>
          <div className={"col-12"}>
            <div className={"row mt-4 w-100"}>
              <div className={"col-10 mx-auto mb-1"}>
                <Button
                  className={"w-100 btn btn-primary shadow mx-auto"}
                  type="submit"
                >
                  Registrati
                </Button>
              </div>
              <div className={"col-7 offset-1 mb-4"}>
                <label className={"mx-auto"}>Hai già un account?</label>
                <Link to={"/login"} className={"ml-3"}>
                  Accedi
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
}

export default RegisterPage;

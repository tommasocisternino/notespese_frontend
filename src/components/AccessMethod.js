import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import Logo from "./Logo";

const AccessMethod = () => {

    const AccessButton = ({label, route}) => {
        return (
            <Link to={route}><Button color="primary" className={"w-100 shadow"}>{label}</Button></Link>
        );
    }

    return (
        <div className={"col-12"}>
            <div className={"row mt-3"}>
                <div className={"w-50"}>
                    <Logo/>
                </div>
            </div>
            <div className={"row mt-3"}>
                <div className={"col-6 offset-3"}>
                    <AccessButton label={"LOGIN"} route={"/login"}/>
                </div>
            </div>
            <div className={"row mt-3"}>
                <div className={"col-6 offset-3"}>
                    <AccessButton label={"REGISTRATI"} route={"/register"}/>
                </div>
            </div>
        </div>
    )
}

export default AccessMethod;
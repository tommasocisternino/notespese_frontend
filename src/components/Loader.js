import {Spinner} from "react-bootstrap";

function Loader() {

    return (
        <div className={"loader"}>
            <Spinner animation={"border"} variant={"primary"}/>
        </div>
    );
}

export default Loader;

import {Image} from "react-bootstrap";

function Logo() {
    return (
        <Image src={process.env.REACT_APP_PUBLIC_URL + "logo.svg"}/>
    );
}

export default Logo;

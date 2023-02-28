import {Image} from "react-bootstrap";

function Logo() {
    return (
        <Image src={process.env.REACT_APP_PUBLIC_URL + "money-logo.svg"} />
    );
}

export default Logo;

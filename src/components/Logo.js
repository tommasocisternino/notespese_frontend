import { Image } from "react-bootstrap";

function Logo({ maxWidth = null }) {
  return (
    <Image
      src={process.env.REACT_APP_PUBLIC_URL + "money-logo.svg"}
      style={maxWidth ? { maxWidth: maxWidth } : {}}
    />
  );
}

export default Logo;

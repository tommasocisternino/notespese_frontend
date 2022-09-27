import AuthContext from "../contexts/AuthContext";
import {useContext} from "react";
import AccessMethod from "../components/AccessMethod";

function AccountPage() {
    const authContext = useContext(AuthContext);

    if (authContext) {
        if (authContext.user) {
            return (
                <div className={"col-auto"}>
                    account
                </div>
            );
        }
    }
    return (<AccessMethod/>);
}

export default AccountPage;

import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import AccessMethod from "../components/AccessMethod";

function AccountPage() {
  const authContext = useContext(AuthContext);

  if (authContext) {
    if (authContext.user) {
      return (
        <div className={"col-10 offset-1 mt-5"}>
          <p>
            Ciao {authContext.user.username}, <br />
            grazie per aver scaricato questa repository. <br />
            Questa WebApp è ancora in fase di sviluppo. Puoi darmi suggerimenti
            su come migliorare le mie skills in React e Laravel sulle relative
            repository GitHub.
          </p>
        </div>
      );
    }
  }
  return <AccessMethod />;
}

export default AccountPage;

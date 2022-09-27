import './App.css';
import {useNavigate} from 'react-router-dom';
import AuthProvider from "./providers/AuthProvider";
import RouteProvider from "./providers/RouteProvider";
import {useContext} from "react";
import AuthContext from "./contexts/AuthContext";

function App(props) {

    const navigate = useNavigate();
    const goToRoute = (route, state = {}) => {
        navigate(route);
    }

    let authContext = useContext(AuthContext);

    return (
        <>
            <AuthProvider goToRoute={goToRoute}>
                <RouteProvider user={authContext.user}/>
            </AuthProvider>
        </>
    );
}

export default App;

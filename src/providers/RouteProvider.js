import { Component } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import RouteContext from "../contexts/RouteContext";

import MovementsListPage from "../pages/MovementsListPage";
import HomeIcon from "@mui/icons-material/Home";
import AddMovementPage from "../pages/AddMovementPage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountPage from "../pages/AccountPage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AuthContext from "../contexts/AuthContext";

class RouteProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: getRoutesIndexedArray(),
      routesComponents: reactComponentsToArray(),
    };
  }

  render() {
    return (
      <RouteContext.Provider value={this.state}>
        <RoutesComponent
          routes={reactComponentsToArray(getRoutesIndexedArray())}
        />
        {this.props.children}
        <AuthContext.Consumer>
          {({ user }) => user && <BottomNavBar routes={this.state.routes} />}
        </AuthContext.Consumer>
      </RouteContext.Provider>
    );
  }
}

const getRoutesIndexedArray = () => {
  let routes = [];
  routes["home"] = {
    path: "/",
    name: "home",
    navOrder: 1,
    element: MovementsListPage,
    icon: HomeIcon,
    addToNavBar: true,
    ReactRouteComponent: (
      <Route
        path={"/"}
        element={wrapIntoAuthConsumer(MovementsListPage)}
        key={"route_home"}
      />
    ),
  };
  routes["add"] = {
    path: "/add",
    name: "add",
    navOrder: 2,
    element: AddMovementPage,
    icon: AddCircleOutlineIcon,
    addToNavBar: true,
    ReactRouteComponent: (
      <Route path={"/add"} element={<AddMovementPage />} key={"route_add"} />
    ),
  };
  routes["account"] = {
    path: "/account",
    name: "account",
    navOrder: 3,
    element: AccountPage,
    icon: AccountCircleIcon,
    addToNavBar: true,
    ReactRouteComponent: (
      <Route
        path={"/account"}
        element={<AccountPage />}
        key={"route_account"}
      />
    ),
  };
  routes["login"] = {
    path: "/login",
    name: "login",
    element: LoginPage,
    icon: AccountCircleIcon,
    addToNavBar: false,
    ReactRouteComponent: (
      <Route path={"/login"} element={<LoginPage />} key={"route_login"} />
    ),
  };
  routes["register"] = {
    path: "/register",
    name: "register",
    element: RegisterPage,
    icon: AccountCircleIcon,
    addToNavBar: false,
    ReactRouteComponent: (
      <Route
        path={"/register"}
        element={<RegisterPage />}
        key={"route_register"}
      />
    ),
  };
  return routes;
};

const wrapIntoAuthConsumer = (Elem) => {
  return (
    <AuthContext.Consumer>
      {(state) => (
        <Elem categories={state.categories} movements={state.movements} />
      )}
    </AuthContext.Consumer>
  );
};

const reactComponentsToArray = () => {
  let routes = [];
  let routes_array = getRoutesIndexedArray();
  for (let key in routes_array) {
    let route = routes_array[key];
    routes.push(route.ReactRouteComponent);
  }
  return routes;
};

const RoutesComponent = ({ routes }) => {
  return <Routes>{routes.map((RouteComponent) => RouteComponent)}</Routes>;
};

const BottomNavBar = ({ routes }) => {
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };

  function routesToNavBar() {
    let to_nav = [];
    for (let key in routes) {
      let route = routes[key];
      if (route.addToNavBar) {
        to_nav.push(route);
      }
    }
    return to_nav.sort((a, b) => a.navOrder - b.navOrder);
  }

  const RouteButton = ({ path, Icon }) => {
    return (
      <div
        onClick={() => {
          goTo(path);
        }}
      >
        <Icon />
      </div>
    );
  };

  return (
    <div
      className={
        "w-100 d-flex flex-row justify-content-between position-absolute bottom-0 bg-white shadow-lg"
      }
    >
      {routesToNavBar().map((route) => {
        return (
          <div className={"col text-center my-2"} key={route.navOrder}>
            <RouteButton path={route.path} Icon={route.icon} />
          </div>
        );
      })}
    </div>
  );
};

export default RouteProvider;

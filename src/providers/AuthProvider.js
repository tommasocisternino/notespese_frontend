import {Component} from "react";
import AuthContext from "../contexts/AuthContext";
import AuthService from "../services/auth";
import axios from "axios";

class AuthProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            token: null,
            setUser: (usr) => {
                this.setState(state => ({
                    user: usr
                }))
            },
            setToken: (tk) => {
                this.setState(state => ({
                    token: tk
                }))
            },
            login: (payload) => {
                AuthService.login(payload).then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('access_token', response.data.access_token);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        this.state.setUser(response.data.user);
                        this.state.setToken(response.data.access_token);
                        this.props.goToRoute("/");
                    } else {
                        throw response.status;
                    }
                });
            },
            logout: () => {
                let token = localStorage.getItem('access_token');
                if (token !== undefined) {
                    AuthService.logout(token).finally((response) => {
                        if (response.status !== 200) {
                            throw response;
                        }
                        this.state.setUser(null);
                        this.state.setToken(null);
                        localStorage.clear();
                        this.props.goToRoute("/", {});
                    });
                } else {
                    this.state.setToken(null)
                    this.state.setUser(null)
                }
            },
            checkToken: () => {
                let token = localStorage.getItem('access_token');
                if (token !== undefined) {
                    AuthService.checkToken(token).then((response) => {
                        if (response.status !== 200) {
                            throw response;
                        }
                        this.state.setUser(response.data);
                        this.state.setToken(token);
                        this.props.goToRoute("/", {});
                    }).catch(() => {
                        localStorage.clear();
                        this.state.setToken(null);
                        this.state.setUser(null);
                        this.props.goToRoute("/account", {});
                    });
                } else {
                    this.state.setToken(null)
                    this.state.setUser(null)
                }
            },
        }
    };

    componentDidMount() {
        this.state.checkToken();
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthProvider;
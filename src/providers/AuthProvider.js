import {Component} from "react";
import AuthContext from "../contexts/AuthContext";
import AuthService from "../services/auth";
import NotificationOverlay from "../components/NotificationOverlay";
import Loader from "../components/Loader";
import CategoryService from "../services/categories";

class AuthProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            token: null,
            categories: null,
            isLoading: false,
            notifyMessage: null,
            notificationTextClass: "text-primary",
            setUser: (usr) => {
                this.setState(state => ({
                    user: usr
                }))
            },
            setCategories: (cat) => {
                this.setState(state => ({
                    categories: cat
                }))
            },
            setToken: (tk) => {
                this.setState(state => ({
                    token: tk
                }))
            },
            login: async (payload) => {
                return await AuthService.login(payload).then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('access_token', response.data.access_token);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        this.state.setUser(response.data.user);
                        this.state.setToken(response.data.access_token);
                        this.props.goToRoute("/");
                        return false;
                    } else {
                        throw response.status;
                    }
                }).catch((err) => {
                    return err;
                });
            },
            register: async (payload) => {
                return await AuthService.register(payload).then((response) => {
                    if (response.status === 201) {
                        localStorage.setItem('access_token', response.data.access_token);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        this.state.setUser(response.data.user);
                        this.state.setToken(response.data.access_token);
                        this.props.goToRoute("/");
                    }
                }).catch(({response}) => {
                    if (response.status === 422) {
                        return response.data.errors ?? false;
                    }
                });
            },
            logout: async () => {
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
            checkUser: () => {
                let token = localStorage.getItem('access_token');
                if (token !== undefined) {
                    AuthService.checkUser(token).then((response) => {
                        if (response.status !== 200) {
                            throw response;
                        }
                        this.state.setUser(response.data);
                        this.state.setToken(token);
                    }).catch(() => {
                        localStorage.clear();
                        this.state.setToken(null);
                        this.state.setUser(null);
                        if (window.location.pathname !== "/login" && !window.location.pathname !== "/register") {
                            this.props.goToRoute("/login", {});
                        }
                    });
                } else {
                    this.state.setToken(null)
                    this.state.setUser(null)
                }
            },
            setIsLoading: (isLoading) => {
                this.setState(state => ({
                    isLoading: isLoading
                }))
            },
            setNotifyMessage: (msg) => {
                this.setState(state => ({
                    notifyMessage: msg
                }))
            },
            setNotificationTextClass: (textClass) => {
                this.setState(state => ({
                    notificationTextClass: textClass
                }))
            },
            notify: (text, textClass, timeout = 3000) => {
                this.state.setNotifyMessage(text);
                this.state.setNotificationTextClass(textClass);

                setTimeout(() => {
                    this.state.setNotifyMessage(null);
                    this.state.setNotificationTextClass("text-primary");
                }, timeout)
            },
            fetchCategories: async () => {
                return await CategoryService.index().then((response) => {
                    this.state.setCategories(response.data.categories)
                    return (response.data.categories);
                }).catch(() => {
                    return ([]);
                })
            },
            addCategory: (payload) => {
                return CategoryService.create(payload).then((response) => {
                    if (response.status === 201) {
                        let cat = this.state.categories;
                        cat.push(payload);
                        this.state.setCategories(cat)
                        this.state.notify("Categoria aggiunta correttamente", "text-success");
                        return true;
                    }
                    throw response;
                }).catch(({response}) => {
                    return response.data.errors;
                })
            },
        }
    };

    componentDidMount() {
        this.state.checkUser();
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.state.isLoading && <Loader/>}
                {this.state.notifyMessage &&
                    <NotificationOverlay text={this.state.notifyMessage} textClass={this.state.notificationTextClass}/>}
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthProvider;
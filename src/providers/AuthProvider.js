import { Component } from "react";
import AuthContext from "../contexts/AuthContext";
import AuthService from "../services/auth";
import NotificationOverlay from "../components/NotificationOverlay";
import Loader from "../components/Loader";
import CategoryService from "../services/categories";
import MovementService from "../services/movements";

class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      token: null,
      categories: [],
      movements: [],
      isLoading: false,
      notifyMessage: null,
      notificationTextClass: "text-primary",
      setUser: (usr) => {
        this.setState((state) => ({
          user: usr,
        }));
      },
      setCategories: (cat) => {
        this.setState((state) => ({
          categories: cat,
        }));
      },
      setMovements: (moves) => {
        this.setState((state) => ({
          movements: moves,
        }));
      },
      setToken: (tk) => {
        this.setState((state) => ({
          token: tk,
        }));
      },
      login: async (payload) => {
        this.state.setIsLoading(true);
        return await AuthService.login(payload)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem("user", JSON.stringify(response.data.user));
              this.state.setUser(response.data.user);
              this.state.setToken(response.data.access_token);
              this.state.fetchResources();
              this.props.goToRoute("/");
              return false;
            } else {
              throw response.status;
            }
          })
          .catch((err) => {
            return err;
          })
          .finally(() => {
            this.state.setIsLoading(false);
          });
      },
      register: async (payload) => {
        this.state.setIsLoading(true);
        return await AuthService.register(payload)
          .then((response) => {
            if (response.status === 201) {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem("user", JSON.stringify(response.data.user));
              this.state.setUser(response.data.user);
              this.state.setToken(response.data.access_token);
              this.state.notify(
                "Registrazione effettuata. Effettua il login",
                "text-success"
              );
              this.props.goToRoute("/login");
            }
          })
          .catch(({ response }) => {
            if (response.status === 422) {
              return response.data.errors ?? false;
            }
          })
          .finally(() => {
            this.state.setIsLoading(false);
          });
      },
      logout: async () => {
        let token = localStorage.getItem("access_token");
        if (token !== undefined) {
          AuthService.logout(token).finally((response) => {
            if (response.status === 200) {
              this.state.setUser(null);
              this.state.setToken(null);
              localStorage.clear();
              this.props.goToRoute("/", {});
            }
            throw response;
          });
        } else {
          this.state.setToken(null);
          this.state.setUser(null);
        }
      },
      checkUser: () => {
        let token = localStorage.getItem("access_token");
        this.state.setIsLoading(true);
        if (token !== undefined) {
          AuthService.checkUser(token)
            .then(async (response) => {
              if (response.status !== 200) {
                throw response;
              }
              this.state.setUser(response.data);
              this.state.setToken(token);
              await this.state.fetchResources();
            })
            .catch(() => {
              localStorage.clear();
              if (
                window.location.pathname !== "/login" &&
                window.location.pathname !== "/register"
              ) {
                this.props.goToRoute("/login", {});
              }
            })
            .finally(() => {
              this.state.setIsLoading(false);
            });
        } else {
          this.state.setUser(null);
        }
      },
      setIsLoading: (isLoading) => {
        this.setState((state) => ({
          isLoading: isLoading,
        }));
      },
      setNotifyMessage: (msg) => {
        this.setState((state) => ({
          notifyMessage: msg,
        }));
      },
      setNotificationTextClass: (textClass) => {
        this.setState((state) => ({
          notificationTextClass: textClass,
        }));
      },
      notify: (text, textClass, timeout = 3000) => {
        this.state.setNotifyMessage(text);
        this.state.setNotificationTextClass(textClass);

        setTimeout(() => {
          this.state.setNotifyMessage(null);
          this.state.setNotificationTextClass("text-primary");
        }, timeout);
      },
      fetchCategories: async () => {
        return await CategoryService.index()
          .then((response) => {
            this.state.setCategories(response.data.categories);
            return response.data.categories;
          })
          .catch(() => {
            return [];
          });
      },
      addCategory: (payload) => {
        return CategoryService.create(payload)
          .then((response) => {
            if (response.status === 201) {
              let cat = this.state.categories;
              cat.push(response.data.category);
              this.state.setCategories(cat);
              this.state.notify(
                "Categoria aggiunta correttamente",
                "text-success"
              );
              return true;
            }
            throw response;
          })
          .catch(({ response }) => {
            return response.data.errors;
          });
      },
      updateCategory: (payload) => {
        return CategoryService.update(payload)
          .then((response) => {
            if (response.status === 200) {
              let cat = this.state.categories;
              let cats = cat.map(function (cat) {
                if (cat.id == payload.id) {
                  return response.data.category;
                }
                return cat;
              });
              this.state.setCategories(cats);

              this.state.notify(
                "Categoria modificata correttamente",
                "text-success"
              );
              return true;
            }
            throw response;
          })
          .catch(({ response }) => {
            return response.data.errors;
          });
      },
      deleteCategory: (id) => {
        return CategoryService.delete(id)
          .then((response) => {
            if (response.status === 204) {
              let cat = this.state.categories;
              let cats = cat.filter(function (cat) {
                return cat.id != id;
              });
              this.state.setCategories(cats);
              this.state.notify(
                "Categoria eliminata correttamente",
                "text-success"
              );
              return true;
            }
            throw response;
          })
          .catch(({ response }) => {
            return response.data.errors;
          });
      },
      fetchMovements: async () => {
        return await MovementService.index()
          .then((response) => {
            this.state.setMovements(response.data.movements);
            return response.data.movements;
          })
          .catch(() => {
            return [];
          });
      },
      addMovement: (payload) => {
        return MovementService.create(payload)
          .then((response) => {
            if (response.status === 201) {
              let moves = this.state.movements;
              moves.push(response.data.movement);
              this.state.setMovements(moves);
              this.state.notify(
                "Movimento aggiunto correttamente",
                "text-success"
              );
              return false;
            } else {
              throw response;
            }
          })
          .catch(({ response }) => {
            this.state.notify(
              "Errore durante l'aggiunta del movimento",
              "text-danger"
            );
            return response.data.errors;
          });
      },
      deleteMovement: (id) => {
        return MovementService.delete(id)
          .then((response) => {
            if (response.status === 204) {
              let moves = this.state.movements;
              moves = moves.filter(function (mov) {
                return mov.id !== id;
              });
              this.state.setMovements(moves);
              this.state.notify(
                "Movimento eliminato correttamente",
                "text-success"
              );
              return false;
            } else {
              throw response;
            }
          })
          .catch(({ response }) => {
            this.state.notify(
              "Errore durante l'eliminazione del movimento",
              "text-danger"
            );
            return response.data.errors;
          });
      },
      fetchResources: async () => {
        // await this.state.fetchCategories();
        // await this.state.fetchMovements();
        await Promise.all([this.state.fetchCategories(), this.state.fetchMovements()]);
      },
    };
  }

  componentDidMount() {
    this.state.checkUser();
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.state.isLoading && <Loader />}
        {this.state.notifyMessage && (
          <NotificationOverlay
            text={this.state.notifyMessage}
            textClass={this.state.notificationTextClass}
          />
        )}
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;

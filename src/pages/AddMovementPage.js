import { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import moment from "moment";
import CategoryModal from "../components/CategoryModal";
import AuthContext from "../contexts/AuthContext";
import FormControl from "../components/Form/Input/FormControl";
import { ReactComponent as PencilIcon } from "../assets/icons/pencil.svg";
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg";
import { ReactComponent as MinusIcon } from "../assets/icons/minus.svg";
import DeleteCategoryModal from "../components/DeleteCategoryModal";

function ListaMovimentiPage() {
  const [value, setValue] = useState();
  const [type, setType] = useState("-");

  const [category, setCategory] = useState(null);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [note, setNote] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [errors, setErrors] = useState([]);

  const authContext = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      category_id: category && category != 0 ? category.id : null,
      date,
      note,
    };

    if (value) {
      if (type === "+") {
        payload.value = Math.abs(value);
      } else {
        payload.value = -Math.abs(value);
      }
    }

    setErrors([]);
    setErrors(await authContext.addMovement(payload));
  };

  return (
    <>
      <CategoryModal
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        category={category}
        show={modalShow}
        setShow={setModalShow}
      />
      <DeleteCategoryModal
        selectedCategoryId={category && category != 0 ? category.id : 0}
        setCategory={setCategory}
        show={deleteModalShow}
        setShow={setDeleteModalShow}
      />
      <div className={"container h-100"}>
        <div className={"row"}>
          <div className={"col-12"}>
            <Form onSubmit={handleSubmit}>
              <div className={"row mt-5 pb-5 text-center"}>
                <h1>AGGIUNGI MOVIMENTO</h1>
              </div>
              <div className={"row mt-3"}>
                <div className={"col-10 offset-1"}>
                  <hr />
                  <div className={"row justify-content-around d-flex"}>
                    <div className={"col-10"}>
                      <Form.Label className={"fw-bolder"}>
                        Tipo di movimento
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                        defaultValue={"-"}
                      >
                        <option value={"-"}>USCITA</option>
                        <option value={"+"}>ENTRATA</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"row mt-3"}>
                <div className={"col-10 offset-1"}>
                  <div className={"row justify-content-around d-flex"}>
                    <div className={"col-10"}>
                      <Form.Label className={"fw-bolder"}>
                        Categoria
                        <Button
                          variant={"primary"}
                          type={"button"}
                          className={"mx-2"}
                          onClick={() => {
                            setIsCreating(true);
                            setModalShow(true);
                          }}
                        >
                          <PlusIcon width={16} height={16} />
                        </Button>
                        {category && category != 0 ? (
                          <>
                            <Button
                              variant={"danger"}
                              type={"button"}
                              className={"mx-2"}
                              onClick={() => {
                                setDeleteModalShow(true);
                              }}
                            >
                              <MinusIcon width={16} height={16} />
                            </Button>
                            <Button
                              variant={"warning"}
                              type={"button"}
                              className={"mx-2"}
                              onClick={() => {
                                setModalShow(true);
                              }}
                            >
                              <PencilIcon width={16} height={16} />
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </Form.Label>
                      <AuthContext.Consumer>
                        {({ categories }) =>
                          categories && (
                            <Form.Select
                              size="sm"
                              onChange={(e) => {
                                if (e.target.value != 0) {
                                  setCategory({
                                    id: e.target.value,
                                    name: e.target.selectedOptions[0].dataset
                                      .text,
                                    color:
                                      e.target.selectedOptions[0].dataset.color,
                                  });
                                } else {
                                  setCategory(null);
                                }
                              }}
                              defaultValue={null}
                            >
                              <option value={0} key={"option_cat_null"}>
                                Seleziona una categoria...
                              </option>
                              {categories.map((cat, index) => {
                                return (
                                  <option
                                    value={cat.id}
                                    key={"option_cat_" + index}
                                    data-text={cat.name}
                                    data-color={cat.color}
                                  >
                                    {cat.name}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          )
                        }
                      </AuthContext.Consumer>
                      {errors && errors.category_id && (
                        <p className={"text-danger text-center"}>
                          {errors.category_id[0]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={"row mt-3"}>
                <div className={"col-5 offset-1"}>
                  <Form.Group>
                    <FormControl
                      changeSetter={setDate}
                      label_text={"Data movimento"}
                      label_className={"fw-bolder"}
                      type={"date"}
                      value={date}
                      errors={errors && errors.date ? errors.date : null}
                    />
                  </Form.Group>
                </div>
                <div className={"col-4 offset-1"}>
                  <Form.Group>
                    <FormControl
                      changeSetter={setValue}
                      label_text={"Importo"}
                      type={"number"}
                      value={value}
                      placeholder={"IMPORTO"}
                      label_className={"fw-bolder"}
                      errors={errors && errors.value ? errors.value : null}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className={"row mt-3"}>
                <div className={"col-10 offset-1"}>
                  <Form.Group className="mb-3">
                    <Form.Label className={"fw-bolder"}>Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className={"row mt-5"}>
                <Button
                  variant={"success"}
                  className={"col-4 offset-4"}
                  type={"submit"}
                >
                  SALVA
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaMovimentiPage;

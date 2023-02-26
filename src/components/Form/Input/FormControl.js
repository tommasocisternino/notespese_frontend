import { Form } from "react-bootstrap";

function FormControl({
  label_text,
  changeSetter,
  type = "text",
  value,
  errors,
  label_className,
  ...props
}) {
  return (
    <>
      {label_text && (
        <Form.Label className={label_className}>{label_text}</Form.Label>
      )}
      <Form.Control
        type={type}
        value={value}
        onChange={(e) => {
          changeSetter(e.target.value);
        }}
        {...props}
      />
      {errors && <p className={"text-danger text-center"}>{errors[0]}</p>}
    </>
  );
}

export default FormControl;

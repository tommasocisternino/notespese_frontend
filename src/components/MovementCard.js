import { ReactComponent as CircleIcon } from "../assets/icons/circle-fill.svg";

function MovementCard({ movement, openModal }) {
  return (
    <div
      className={"d-flex flex-row align-items-center card shadow my-1 p-3 lh-1"}
      onClick={() => openModal(movement)}
    >
      <CircleIcon
        className={movement.value >= 0 ? "text-success" : "text-danger"}
      />
      <label className={"mx-auto"}>{movement.value}€</label>
      <label className={"mx-auto"}>{movement.date}</label>
      <div
        className={"mx-auto category-color-square"}
        style={{ backgroundColor: movement.category_color }}
      />
    </div>
  );
}

export default MovementCard;

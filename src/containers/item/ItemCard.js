//import "./../../App.css";
import "../../assets/styles/item.css";
import React, { useContext, useState, useCallback } from "react";
import { ItemContext } from "../../providers/ItemProvider";
import ItemUpdateModal from "./UpdateModal";
import Card from "../../components/card/Card";

function ItemCard({ item }) {
  const { handlerMap } = useContext(ItemContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), [setIsModalOpen]);

  let resolvedColor;
  switch (true) {
    case item.resolved:
      resolvedColor = "#0D6943";
      break;
    case !item.resolved:
      resolvedColor = "#5B5B5B";
      break;
    default:
      resolvedColor = "#5B5B5B";
      break;
  }

  return (
    <Card className="itemCard">
      <div>
        <h3>{item.title}</h3>
      </div>
      <div>
        <i
          className="fa-solid fa-square-check"
          onClick={(e) => handlerMap.handleResolve(item.id)}
          style={{ color: resolvedColor }}
        ></i>
        <i className="fa-solid fa-pen-to-square" onClick={openModal}></i>
        <i
          className="fa-solid fa-x"
          onClick={(e) => handlerMap.handleDelete(item.id)}
        ></i>
      </div>

      <ItemUpdateModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        values={item}
      />
    </Card>
  );
}

export default ItemCard;

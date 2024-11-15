import React, { createContext, useState, useContext, useEffect } from "react";
import { ListContext } from "./ListProvider";

// Initial item data
let itemData = [
  { id: 1, list_id: 1, title: "One", resolved: false },
  { id: 2, list_id: 1, title: "Two", resolved: false },
  { id: 3, list_id: 1, title: "Three", resolved: true },
  { id: 4, list_id: 3, title: "Four", resolved: false },
];



export const ItemContext = createContext();

function ItemProvider({ children }) {
  const { listData, listId } = useContext(ListContext);
  const [data, setData] = useState(itemData);
  const [filterOption, setFilterOption] = useState("all");

  let urlArray = window.location.pathname.split('/');
  let currentListId = Number(urlArray[2]); //MAYBE USE STATE ?

  useEffect(() => {
    handleLoad(currentListId, filterOption);
  }, [listData, filterOption]);

  function handleLoad(list_id, option) {
    //Issues after marking item as resolved
    const items = itemData.filter((item) => item.list_id === list_id);

    const filteredItems = items.filter((item) => {
      if (option === "resolved") return item.resolved;
      if (option === "unresolved") return !item.resolved;
      return true;
    });

    setData(filteredItems);
  }

  function handleDelete(item_id) {
    setData((current) => current.filter((item) => item.id !== item_id));
  }

  function handleCreate(title) {
    const newItem = {
      id: Math.random().toString(),
      list_id: currentListId, //CHANGABLE
      title: title,
      resolved: false,
    };
    setData((current) => [...current, newItem]);
  }

  function handleResolve(item_id) {
    setData((current) =>
      current.map((item) =>
        item.id === item_id ? { ...item, resolved: !item.resolved } : item
      )
    );
  }

  function handleUpdate(item_id, title) {
    setData((current) =>
      current.map((item) => (item.id === item_id ? { ...item, title } : item))
    );
  }

  const value = {
    itemData: data || [],
    setFilterOption,
    filterOption,
    handlerMap: {
      handleDelete,
      handleResolve,
      handleUpdate,
      handleCreate,
    },
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}

export default ItemProvider;

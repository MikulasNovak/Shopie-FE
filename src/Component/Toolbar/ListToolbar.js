import React, { useState, useCallback, useContext } from "react";
import "../../App.css";
import { ListContext } from "../../Provider/ListProvider";
import { UserContext } from "../../Provider/UserProvider";
import ListCreateModal from "../List/CreateModal";

function ListToolbar() {
  const { handlerMap, setFilterOption, filterOption } = useContext(ListContext);

  function handleFilterChange(event) {
    setFilterOption(event.target.value); // This triggers handleLoad in the provider
  }

  const [isModalListCreateOpen, setIsModalListCreateOpen] = useState(false);
  const closeModalListCreate = useCallback(
    () => setIsModalListCreateOpen(false),
    [setIsModalListCreateOpen]
  );

  return (
    <div className="listToolbar">
      <div>
        <h2>Home</h2>
        <button
          className="addButton"
          onClick={() => setIsModalListCreateOpen(true)}
        >
          Add list
        </button>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="filterList"
            value="all"
            defaultChecked
            onChange={handleFilterChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="filterList"
            value="archived"
            onChange={handleFilterChange}
          />
          Archived
        </label>
        <label>
          <input
            type="radio"
            name="filterList"
            value="unarchived"
            onChange={handleFilterChange}
          />
          Unarchived
        </label>
      </div>

      <ListCreateModal
        closeModal={closeModalListCreate}
        isModalOpen={isModalListCreateOpen}
      />
    </div>
  );
}

export default ListToolbar;

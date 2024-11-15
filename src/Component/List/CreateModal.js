import React, { useState, useContext } from "react";
import "../../App.css";
import Modal from "../../Modal";
import { ListContext } from "../../Provider/ListProvider";

function ItemCreateModal({ isModalOpen, closeModal }) {
    const { handlerMap } = useContext(ListContext);
    const [title, setTitle] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handlerMap.handleCreate(title);
        setTitle("");
        closeModal();
    };

    return (
        <Modal isOpen={isModalOpen} closeModal={closeModal} title="Create list">
            <form onSubmit={handleSubmit} className="itemForm">
                <div>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="modalFormButtons">
                    <button type="button" onClick={closeModal}>
                        Close
                    </button>
                    <button type="submit" variant="primary">
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default ItemCreateModal;
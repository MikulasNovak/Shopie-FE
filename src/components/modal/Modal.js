import "../../assets/styles/global.css";
import Button from "../button/Button";
function Modal({ isOpen, closeModal, children, title, handleSubmit }) {
  return (
    <>
      {isOpen && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3 className="modalTitle">{title}</h3>
              <i className="fa-solid fa-x" onClick={closeModal}></i>
            </div>
            <form onSubmit={handleSubmit} className="modalForm">
              {children}
              <div className="modalButtons">
                <Button
                  type="submit"
                  buttonText={"Save"}
                  className="modalSave"
                />
                <Button
                  onClick={closeModal}
                  buttonText={"Close"}
                  className="modalClose"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

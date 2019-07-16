import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
// import delayUnmounting from "./delayUnmounting";
import Context from "../Context";

const Modal = ({ children, className, activate, active }) => {
  const [context] = useContext(Context);
  const [el, setEl] = useState();

  useEffect(() => {
    const newEl = document.createElement("div");
    const closeModal = ev => {
      if (ev.target === newEl) {
        activate(false);
      }
    };
    newEl.className = className;
    newEl.addEventListener("click", activate);
    window.addEventListener("click", closeModal);
    context.modalRoot.appendChild(newEl);

    setEl(newEl);
    return () => {
      newEl.removeEventListener("click", activate);
      window.removeEventListener("click", closeModal);
      context.modalRoot.removeChild(newEl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (el) {
      const newEl = el;
      newEl.className = className;
    }
  }, [className, el]);

  return el
    ? ReactDOM.createPortal(
        <div className="content">
          <button
            type="button"
            className="exp-plus close"
            onClick={() => activate(false)}
          />
          {children}
        </div>,
        el
      )
    : null;
};

export default Modal;

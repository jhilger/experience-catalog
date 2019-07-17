import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
// import delayUnmounting from "./delayUnmounting";
import Context from "../Context";

const Modal = ({ children, className, activate, active, history }) => {
  const [context] = useContext(Context);
  const [el, setEl] = useState();

  useEffect(() => {
    const newEl = document.createElement("div");
    newEl.className = className;
    context.modalRoot.appendChild(newEl);

    setEl(newEl);
    return () => {
      context.modalRoot.removeChild(newEl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (el) {
      const newEl = el;
      const closeModal = ev => {
        if (ev.target === newEl) {
          activate(false);
        }
      };
      if (active) window.addEventListener("click", closeModal);
      return () => {
        window.removeEventListener("click", closeModal);
      };
    }
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

export default withRouter(Modal);

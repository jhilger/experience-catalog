import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import Context from "./Context";

const Toasts = ({ children }) => {
  const [context] = useContext(Context);
  const [el, setEl] = useState();

  useEffect(() => {
    const el = document.createElement("div");
    context.toastsRoot.appendChild(el);
    setEl(el);
    return () => {
      context.toastsRoot.removeChild(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return el
    ? ReactDOM.createPortal(
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            display: "flex",
            justifyContent: "center"
          }}
        >
          {children}
        </div>,
        el
      )
    : null;
};

export default Toasts;

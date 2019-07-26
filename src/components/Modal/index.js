import React, { useState, useEffect } from "react";
import "./modal.scss";
import Modal from "./Modal";

const ModalWrapper = ({ active, activate, children }) => {
  const [hideContent, setHideContent] = useState(!active);
  useEffect(() => {
    if (!active && !hideContent) {
      setTimeout(() => setHideContent(true), 1000);
    } else if (active && hideContent) {
      setHideContent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideContent, active]);
  return (
    <Modal
      activate={activate}
      active={active}
      className={active ? "overlay active" : "overlay"}
    >
      {!hideContent ? children : null}
    </Modal>
  );
};

export default ModalWrapper;

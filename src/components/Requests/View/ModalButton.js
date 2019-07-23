import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../Modal";
import Context from "../../Context";
import RequestList from "./List/Bullet";

const RequestModalButton = ({ history , type, buttonLabel, modalLabel }) => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ requests }] = useContext(Context);
  return (
    <React.Fragment>
      <button
        type="button"
        className="info"
        onClick={() => {
          history.push(`${history.location.pathname}#requests`);
          setShowReqs(!showReqs);
        }}
      >
        <span>{requests.total}</span>{buttonLabel}
      </button>
      <Modal
        activate={bool => {
          if (bool === false || setShowReqs)
            history.push(history.location.pathname);
          setShowReqs(typeof bool === "boolean" ? bool : !setShowReqs);
        }}
        active={showReqs}
      >
        <RequestList type={type} label={modalLabel}/>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(RequestModalButton);

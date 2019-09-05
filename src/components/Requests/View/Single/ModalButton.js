import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../../Modal";
// import Context from "../../../Context";
import RequestView from ".";

const RequestModalButton = ({ history, id, children }) => {
  const [showReqs, setShowReqs] = useState(false);

  return (
    <React.Fragment>
      <button
        type="button"
        className="info"
        onClick={() => {
          history.push(`/requests/single/${id}`);
          setShowReqs(!showReqs);
        }}
      >
        {children}
      </button>
      <Modal
        activate={bool => {
          if (bool === false || setShowReqs)
            history.push(history.location.pathname);
          setShowReqs(typeof bool === "boolean" ? bool : !showReqs);
        }}
        active={showReqs}
      >
        <RequestView id={id} />
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(RequestModalButton);

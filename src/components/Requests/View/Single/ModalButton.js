import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../../Modal";
<<<<<<< HEAD
// import Context from "../../../Context";
import RequestView from ".";
=======
<<<<<<< HEAD:src/components/Requests/View/List/ModalButton.js
import Context from "../../../Context";
import RequestList from "./Bullet";
=======
// import Context from "../../../Context";
import RequestView from ".";
>>>>>>> 6a891a030dd91f42067ad5ba6b616a39026a4424:src/components/Requests/View/Single/ModalButton.js
>>>>>>> 6a891a030dd91f42067ad5ba6b616a39026a4424

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

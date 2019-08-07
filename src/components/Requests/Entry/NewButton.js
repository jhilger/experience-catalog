import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../Modal";
import Context from "../../Context";
import NewEntry from "./NewEntry";

const EntryModalButton = ({ history, experience }) => {
  const [showReqs, setShowReqs] = useState(false);
  return (
    <>
      <button
        type="button"
        className="info"
        onClick={() => {
          history.push(`${history.location.pathname}#entry`);
          setShowReqs(!showReqs);
        }}
      >
        Invite Contact
      </button>
      <Modal
        activate={bool => {
          if (bool === false || setShowReqs)
            history.push(history.location.pathname);
          setShowReqs(typeof bool === "boolean" ? bool : !setShowReqs);
        }}
        active={showReqs}
      >
        <NewEntry experience={experience} />
      </Modal>
    </>
  );
};

export default withRouter(EntryModalButton);

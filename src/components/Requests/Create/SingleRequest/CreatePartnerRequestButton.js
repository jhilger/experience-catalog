import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../../Modal";
import CreateSingleRequest from "./CreateSingleRequest";

const CreatePartnerRequestButton = ({ history, experience }) => {
  const [showReqs, setShowReqs] = useState(false);
  return (
    <>
      <div>
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
      </div>
      <Modal
        activate={bool => {
          if (bool === false || setShowReqs)
            history.push(history.location.pathname);
          setShowReqs(typeof bool === "boolean" ? bool : !setShowReqs);
        }}
        active={showReqs}
      >
        <CreateSingleRequest experience={experience} />
      </Modal>
    </>
  );
};

export default withRouter(CreatePartnerRequestButton);

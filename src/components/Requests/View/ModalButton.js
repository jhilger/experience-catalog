import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../Modal";
import Context from "../../Context";
import RequestList from "./List/Bullet";

const ExperienceModalButton = ({ history }) => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ requests }] = useContext(Context);
  return (
    <>
      <button
        type="button"
        className="info"
        onClick={() => {
          history.push(`${history.location.pathname}#requests`);
          setShowReqs(!showReqs);
        }}
      >
        <span>{requests.total}</span>Pending
      </button>
      <Modal
        activate={bool => {
          if (bool === false || setShowReqs)
            history.push(history.location.pathname);
          setShowReqs(typeof bool === "boolean" ? bool : !setShowReqs);
        }}
        active={showReqs}
      >
        <RequestList />
      </Modal>
    </>
  );
};

export default withRouter(ExperienceModalButton);

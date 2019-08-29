import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../../Modal";
import Context from "../../../Context";
import RequestList from "./Bullet";

const RequestModalButton = ({ history, buttonLabel, modalLabel }) => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ requests }] = useContext(Context);
  // console.log("Requests ", requests);

  return (
    <>
      <button
        type="button"
        className="req"
        data-content={requests.data.length || 0}
        onClick={() => {
          history.push(`${history.location.pathname}#requests`);
          setShowReqs(!showReqs);
        }}
      />
      <Modal
        activate={bool => {
          if (bool === false || setShowReqs)
            history.push(history.location.pathname);
          setShowReqs(typeof bool === "boolean" ? bool : !showReqs);
        }}
        active={showReqs}
      >
        <RequestList label={modalLabel} />
      </Modal>
    </>
  );
};

export default withRouter(RequestModalButton);

/*
 <button
        type="button"
        className="info"
        data-content={requests.data.length || 0}
        onClick={() => {
          history.push(`${history.location.pathname}#requests`);
          setShowReqs(!showReqs);
        }}
      >
        <span>{requests.data.length || 0}</span>
        {buttonLabel}
      </button>
*/

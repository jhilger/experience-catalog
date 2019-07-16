import React, { useState, useContext } from "react";
import Modal from "../Modal";
import Context from "../Context";
import RequestList from "./List";

const ExperienceModalButton = () => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ requests }] = useContext(Context);
  return (
    <>
      <button
        type="button"
        className="info"
        onClick={() => setShowReqs(!showReqs)}
      >
        <span>{requests.length}</span> Requests
      </button>
      <Modal
        activate={bool =>
          setShowReqs(typeof bool === "boolean" ? bool : !showReqs)
        }
        active={showReqs}
      >
        <RequestList />
      </Modal>
    </>
  );
};

export default ExperienceModalButton;

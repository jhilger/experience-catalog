import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "./Modal";
import Context from "./Context";

const TierModalButton = ({ history, buttonLabel, modalLabel }) => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ tiers }] = useContext(Context);
  // console.log("Requests ", requests);

  return (
    <>
      <button
        type="button"
        className="fancy"
        onClick={() => {
          history.push(`${history.location.pathname}#requests`);
          setShowReqs(!showReqs);
        }}
      >
        {buttonLabel}
      </button>
      <Modal
        activate={bool => {
          if (bool === false || setShowReqs)
            history.push(history.location.pathname);
          setShowReqs(typeof bool === "boolean" ? bool : !showReqs);
        }}
        active={showReqs}
      >
        <h2>{modalLabel}</h2>
        <div className="exp-list">
          <ul>
            {tiers.length ? (
              tiers.map(({ id, name, description, doc }) => (
                <li key={id}>
                  <a
                    className="tier"
                    download
                    href={`${process.env.PUBLIC_URL}${doc}`}
                  >
                    <h5>{name}</h5>
                    {description}
                  </a>
                </li>
              ))
            ) : (
              <li>Sorry, no tiers found.</li>
            )}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default withRouter(TierModalButton);

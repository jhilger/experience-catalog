import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "./Modal";
import Context from "./Context";

const TierModalButton = ({ history, buttonLabel, modalLabel }) => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ tiers }] = useContext(Context);
  // console.log("Requests ", requests);

  // TODO: (Isaac) Need to have a way to sort the tiers.

  return (
    <>
      <button
        type="button"
        className="doc"
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
        <h2>{modalLabel}</h2>
        <div className="exp-list">
          <ul>
            {tiers.length ? (
              tiers.map(
                ({
                  Id,
                  Name,
                  Description__c: descript,
                  Document_Ref__c: doc
                }) => (
                  <li key={Id}>
                    <a
                      className="tier"
                      download
                      href={`${process.env.PUBLIC_URL}${doc}`}
                    >
                      <h5>{Name}</h5>
                      {descript}
                    </a>
                  </li>
                )
              )
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

import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../Modal";
import Context from "../../Context";
import RequestList from "./List/Bullet";

const RequestModalButton = ({ history , type, buttonLabel, modalLabel }) => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ requests }] = useContext(Context);

  //TODO: (Isaac) Counting Submitted or Approved and removing the ones were the date has passed.  Data should probably auto-exlude past dates
  const reducer = (a, c) => {
    return (c.Status__c === type && new Date().getTime() < new Date(c.Event_Date__c).getTime()) ? a + 1 : a;
  };

  console.log('Requests ', requests);

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
        <span>{requests.records.reduce( reducer , 0 )}</span>{buttonLabel}
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

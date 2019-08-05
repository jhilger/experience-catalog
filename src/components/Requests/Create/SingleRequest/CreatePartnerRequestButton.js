import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../../Modal";
import CreateSingleRequest from "./CreateSingleRequest";
import Context from "../../../Context";
// import { dispatch } from "../../../../../../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/rxjs/internal/observable/range";
import { onExpClick } from "../actionCreators";

const CreatePartnerRequestButton = ({ history, ...initialValues }) => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ experiences }, dispatch] = useContext(Context);
  const experienceId = initialValues.initialValues.Experience__c;
  return (
    <>
      <div>
        <button
          type="button"
          className="info"
          onClick={() => {
            dispatch(onExpClick(experienceId));
            history.push(`${history.location.pathname}#entry`);
            setShowReqs(!showReqs);
          }}
        >
          Invite Contact
        </button>
      </div>
      <Modal
        activate={bool => {
          if (bool === false || showReqs)
            history.push(history.location.pathname);
          setShowReqs(typeof bool === "boolean" ? bool : !showReqs);
        }}
        active={showReqs}
      >
        <CreateSingleRequest onSuccess={() => setShowReqs(false)} />
      </Modal>
    </>
  );
};

export default withRouter(CreatePartnerRequestButton);

import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../Modal";
import Context from "../../Context";
import ExperienceList from "./List/Bullet";

const ExperienceModalButton = ({ history }) => {
  const [showExps, setShowExps] = useState(false);
  const [{ experiences }] = useContext(Context);
  return (
    <React.Fragment>
      <button
        type="button"
        className="info"
        onClick={() => {
          history.push(`${history.location.pathname}#experiences`);
          setShowExps(!showExps);
        }}
      >
        <span>{experiences.total}</span>Approved
      </button>
      <Modal
        activate={bool => {
          setShowExps(typeof bool === "boolean" ? bool : !showExps);
        }}
        active={showExps}
      >
        <ExperienceList />
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(ExperienceModalButton);

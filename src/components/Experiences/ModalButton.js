import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../Modal";
import Context from "../Context";
import ExperienceList from "./List";

const ExperienceModalButton = ({ history }) => {
  const [showExps, setShowExps] = useState(false);
  const [{ experiences }] = useContext(Context);
  console.log(history);
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
        <span>{experiences.total}</span> Experiences
      </button>
      <Modal
        activate={bool => {
          if (bool === false || showExps)
            history.push(history.location.pathname);
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

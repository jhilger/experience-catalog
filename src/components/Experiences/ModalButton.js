import React, { useState, useContext } from "react";
import Modal from "../Modal";
import Context from "../Context";
import ExperienceList from "./List";

const ExperienceModalButton = () => {
  const [showExps, setShowExps] = useState(false);
  const [{ experiences }] = useContext(Context);
  return (
    <>
      <button
        type="button"
        className="info"
        onClick={() => setShowExps(!showExps)}
      >
        <span>{experiences.length}</span> Experiences
      </button>
      <Modal
        activate={bool =>
          setShowExps(typeof bool === "boolean" ? bool : !showExps)
        }
        active={showExps}
      >
        <ExperienceList />
      </Modal>
    </>
  );
};

export default ExperienceModalButton;

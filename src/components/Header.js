import React, { useContext, useState } from "react";
import Context from "./Context";
import LoginButton from "./LoginButton";
import Modal from "./Modal";
import "../scss/header.scss";

const Header = ({ modalContent, activateModal }) => {
  const [{ loggedIn, user, tempReqData, tempExpData }] = useContext(Context);
  const [showReqs, setShowReqs] = useState(false);
  const [showExps, setShowExps] = useState(false);

  return (
    <header>
      <div className="exp-title">
        <h1>
          Customer Experience <span>Catalog</span>
        </h1>
        <div className="exp-rule" />
      </div>
      <div className="exp-user">
        {loggedIn ? (
          <React.Fragment>
            <h6>Welcome {user.display_name}</h6>
            <button
              type="button"
              className="info"
              onClick={() => setShowReqs(!showReqs)}
            >
              <span>{tempReqData.length}</span> Requests
            </button>
            <button
              type="button"
              className="info"
              onClick={() => setShowExps(!showExps)}
            >
              <span>{tempExpData.length}</span> Experiences
            </button>

            <Modal
              activate={bool =>
                setShowExps(typeof bool === "boolean" ? bool : !showExps)
              }
              active={showExps}
            >
              {showExps && <h1>EXPS</h1>}
            </Modal>
            <Modal
              activate={bool =>
                setShowReqs(typeof bool === "boolean" ? bool : !showReqs)
              }
              active={showReqs}
            >
              <h1>Reqs</h1>
            </Modal>
          </React.Fragment>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useContext } from "react";
import Context from "./Context";
import LoginButton from "./LoginButton";
import "../scss/header.scss";

const Header = props => {
  const [context] = useContext(Context);

  const sendModalContent = type => {
    props.modalContent(type);
    props.activateModal(true);
  };

  return (
    <header>
      <div className="exp-title">
        <h1>
          Customer Experience <span>Catalog</span>
        </h1>
        <div className="exp-rule" />
      </div>
      <div className="exp-user">
        {context.loggedIn ? (
          <React.Fragment>
            <h6>Welcome {context.user.display_name}</h6>
            <button
              className="info"
              onClick={() => sendModalContent("requests")}
            >
              <span>{context.tempReqData.length}</span> Requests
            </button>
            <button
              className="info"
              onClick={() => sendModalContent("experiences")}
            >
              <span>{context.tempExpData.length}</span> Experiences
            </button>
          </React.Fragment>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;

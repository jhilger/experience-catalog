import React, { useContext } from "react";
import Context from "./Context";
import LoginButton from "./LoginButton";
import ExperienceModalButton from "./Experiences/ModalButton";
import RequestModalButton from "./Requests/View/ModalButton";
import "../scss/header.scss";

const Header = () => {
  const [{ loggedIn, user }] = useContext(Context);

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
            <RequestModalButton />
            <ExperienceModalButton />
          </React.Fragment>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;

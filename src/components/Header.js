import React, { useContext } from "react";
import Context from "./Context";
import LoginButton from "./LoginButton";
// import ExperienceModalButton from "./Experiences/View/ModalButton";
import RequestModalButton from "./Requests/View/List/ModalButton";
import TierModalButton from "./TierModalButton";
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
          <>
            <h6>Welcome {user.Name}</h6>
            <RequestModalButton
              buttonLabel="Track Requests"
              modalLabel="Requests"
            />
            <TierModalButton
              buttonLabel="Tier Documents"
              modalLabel="Tier Documents"
            />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;

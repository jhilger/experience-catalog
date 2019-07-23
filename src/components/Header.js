import React, { useContext } from "react";
import Context from "./Context";
import LoginButton from "./LoginButton";
//import ExperienceModalButton from "./Experiences/View/ModalButton";
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
            <RequestModalButton buttonLabel="Pending" modalLabel="Pending Requests" type="pending" />
            <RequestModalButton buttonLabel="Approved" modalLabel="Approved Requests" type="approved" />
          </React.Fragment>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;


/*
const Header = () => {
  const [{ loggedIn, user, contacts, contactId }] = useContext(Context);
  const contact = contacts.data[contactId];
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
            {contact && <h6>Inviting {contact.Name}</h6>}
            <RequestModalButton buttonLabel="Pending" modalLabel="Pending Requests" type="pending" />
            <RequestModalButton buttonLabel="Approved" modalLabel="Approved Requests" type="approved" />
          </React.Fragment>
        ) : (
            <LoginButton />
          )}
      </div>
    </header>
  );
};

export default Header;
*/

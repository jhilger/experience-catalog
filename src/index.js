import "./polyfills";
import React from "react";
import "./scss/foundation.css";
import "./scss/fonts.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./scss/global.scss";
import "./scss/cardanimations.scss";
import OAuth from "forcejs/dist/force.oauth";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";
import App from "./components/App";
import jsforce from "./jsforce";
import {
  getUser,
  authNeeded,
  contactId,
  getCallbackUrl,
  loggedIn,
  modalRoot
} from "./startup";

import * as serviceWorker from "./serviceWorker";

// TODO: (Isaac) Will not work on IE11 or Edge. Popup for login doesn't send user back to correct screen.
// TODO: (Isaac) Will not work on mobile emulator in Web Dev Tools. Popup for login doesn't send user back to correct screen.
// TODO: (Isaac) Probably will need to login automatically since the user will see the ww2.txtav.com login screen first.

// ReactDOM.render(<App />, document.getElementById('root'));

hydrate(
  <BrowserRouter basename="/">
    <App
      value={{
        jsforce,
        authNeeded: !!authNeeded,
        user: getUser(),
        loggedIn: loggedIn(),
        modalRoot,
        contactId,
        oAuth: OAuth.createInstance(
          window.clientId,
          window.loginUrl,
          getCallbackUrl()
        )
      }}
    />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// import "./polyfills";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "react-app-polyfill/ie11";
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

// ReactDOM.render(<App />, document.getElementById('root'));
// eslint-disable-next-line

hydrate(
  <BrowserRouter basename="/">
    <App
      value={{
        jsforce,
        authNeeded: !!authNeeded,
        user: getUser(),
<<<<<<< HEAD
        loggedIn: !!getUser().display_name || !!getUser().Name,
=======
        loggedIn: loggedIn(),
>>>>>>> a2fcebda331e88b83f21a00acb6cc8c3ecdeab2c
        modalRoot,
        contactId,
        oAuth: OAuth.createInstance(
          window.clientId,
          window.loginUrl,
<<<<<<< HEAD
          `${window.location.origin}/oauth/callback/`
=======
          getCallbackUrl()
>>>>>>> a2fcebda331e88b83f21a00acb6cc8c3ecdeab2c
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

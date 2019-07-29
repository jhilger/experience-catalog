import React from "react";
import "./scss/foundation.css";
import "./scss/fonts.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./scss/global.scss";
import "./scss/cardanimations.scss";
import { OAuth } from "forcejs";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";
import App from "./components/App";
import jsforce from "./jsforce";
import defaultState from "./components/defaultState";

import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById('root'));
// eslint-disable-next-line
const contactId = location.search
  .replace("?", "")
  .split("&")
  .map(v => v.split("="))
  .reduce(
    (p, [key, value]) => ({
      ...p,
      [key]: value
    }),
    {}
  ).id;

const getUser = () =>
  JSON.parse(localStorage.getItem("local_user")) || defaultState.user;

const modalRoot = document.getElementById("modal");

hydrate(
  <BrowserRouter basename="/">
    <App
      value={{
        jsforce,
        user: getUser(),
        loggedIn: !!getUser().display_name || !!getUser().Name,
        modalRoot,
        contactId,
        oAuth: OAuth.createInstance(
          window.clientId,
          window.loginUrl,
          `${window.location.origin}/oauth/callback/`
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

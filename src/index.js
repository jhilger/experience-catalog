import React from "react";
//import ReactDOM from 'react-dom';
import App from "./components/App";

import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";
import jsforce from "./jsforce";
import defaultState from "./components/defaultState";

import * as serviceWorker from "./serviceWorker";

//ReactDOM.render(<App />, document.getElementById('root'));

const getUser = () => {
  return JSON.parse(localStorage.getItem("local_user")) || defaultState.user;
};

const toastsRoot = document.getElementById("toasts");

hydrate(
  <BrowserRouter>
    <App
      value={{
        jsforce,
        user: getUser(),
        loggedIn: getUser().display_name ? true : false,
        toastsRoot
      }}
    />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

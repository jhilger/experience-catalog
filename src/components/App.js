import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
// import { ThemeProvider } from "styled-components";

import DataService from "forcejs/dist/force.data-service";
import Home from "../../routes/Home";
import OAuthCallback from "../../routes/OAuthCallback";
import RequestPage from "../../routes/Request";
import { Provider } from "../Context";
import reducer, { useThunkReducer } from "../reducer";
import defaultState from "../defaultState";

const App = ({ value = defaultState }) => {
  const [state, dispatch] = useThunkReducer(reducer, {
    ...defaultState,
    ...value
  });

  console.log(value);
  useEffect(() => {
    if (
      window.location.origin === "ww2.txtav.com" ||
      !value.authNeeded ||
      state.loggedIn
    ) {
      Promise.resolve()
        // .then(() => delay(500))
        .then(() => {
          const oauth = localStorage.getItem("oAuth");
          if (oauth) {
            return JSON.parse(oauth);
          }
          if (!oauth) {
            console.log(state.oAuth);
            return state.oAuth.login().then(oauthResult => {
              localStorage.setItem("oAuth", JSON.stringify(oauthResult));
              return oauthResult;
            });
          }
        })
        .then(oauthResult =>
          DataService.createInstance(oauthResult, {
            useProxy: false
          })
        )
        .catch(err => console.log(err))
        .then(() => {
          const service = DataService.getInstance();
          return service
            .retrieve("User", service.getUserId())
            .then(response => {
              dispatch({ type: "loggedin", payload: response });
              localStorage.setItem("local_user", JSON.stringify(response));
            });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Provider value={[state, dispatch]}>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/oauth/callback" component={OAuthCallback} /> */}
        <Route path="/requests/single/:id" component={RequestPage} />
        <Route exact path="/ajax/proxy/" component={Home} />
      </Switch>
    </Provider>
  );
};
App.propTypes = {
  value: PropTypes.object.isRequired
};
export default App;

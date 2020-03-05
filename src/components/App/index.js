import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
// import { ThemeProvider } from "styled-components";

import DataService from "forcejs/dist/force.data-service";
import Home from "../../routes/Home";
// import OAuthCallback from "../../routes/OAuthCallback";
import RequestPage from "../../routes/Request";
import { Provider } from "../Context";
import reducer, { useThunkReducer } from "../reducer/index";
import defaultState from "../defaultState";

const App = ({ value = defaultState }) => {
  const [state, dispatch] = useThunkReducer(reducer, {
    ...defaultState,
    ...value
  });

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

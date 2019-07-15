import React, { useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "../routes/Home";
import OAuthCallback from "../routes/OAuthCallback";

import { Provider } from "./Context";
import LoginButton from "./LoginButton";
import Button from "./Button";
import ToastsModal from "./ToastsModal";
import Toast from "./Toast";
import theme from "./theme";
import reducer from "./reducer";
import defaultState from "./defaultState";
import GlobalStyle from "./GlobalStyle";

const App = ({ value = defaultState }) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState, ...value });
  const newDispatch = (action, timeout, followUpAction) => {
    dispatch(action);
    if (typeof timeout === "number") {
      setTimeout(() => {
        dispatch({
          type: "CLEAR",
          payload: {
            timeStamp: action.payload.timeStamp,
            timeOut: timeout + action.payload.timeStamp
          }
        });
      }, timeout);
    }
  };
  return (
    <Provider value={[state, newDispatch]}>
      <ThemeProvider theme={{ mode: "light", main: theme }}>
        <React.Fragment>
          <GlobalStyle />
          {!!state.toasts.length && (
            <ToastsModal>
              {" "}
              {state.toasts.map(toast => (
                <Toast key={toast.timeStamp} toast={toast} />
              ))}
            </ToastsModal>
          )}
          <div style={{ paddingLeft: "68px" }}>
            <Button.Group>
              <LoginButton />
              <Button type="button">Cancel</Button>
            </Button.Group>
          </div>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/oauth/callback" component={OAuthCallback} />
            <Route exact path="/ajax/proxy/" component={Home} />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

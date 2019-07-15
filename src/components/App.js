import React, { useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import OAuthCallback from "../routes/OAuthCallback";
import { Provider } from "./Context";
//import LoginButton from "./components/LoginButton";
//import ToastsModal from "./components/ToastsModal";
//import Toast from "./components/Toast";
import reducer from "./reducer";
import defaultState from "./defaultState";

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
      {/*<LoginButton />*/}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/oauth/callback" component={OAuthCallback} />
        <Route exact path="/ajax/proxy/" component={Home} />
      </Switch>
    </Provider>
  );
};

export default App;

/*
{
!!state.toasts.length && (
  <ToastsModal>
    {" "}
    {state.toasts.map(toast => (
      <Toast key={toast.timeStamp} toast={toast} />
    ))}
  </ToastsModal>
)
}
*/

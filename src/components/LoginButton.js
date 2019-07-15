import React, { useContext, useEffect, useState } from "react";
import Context from "./Context";

const LoginButton = () => {
  const [context, dispatch] = useContext(Context);
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  if (context.loggedIn || !rendered) return null;
  return (
    <button
      className="fancy"
      onClick={e => {
        window.onunload = () => {
          localStorage.removeItem("local_user");
          context.jsforce.browser.logout();
        };
        context.jsforce.browser.login(
          {
            loginUrl: window.loginUrl,
            popup: { width: 800, height: 600 }
          },
          function(err) {
            if (err) {
              /*return dispatch(
                {
                  type: "TOAST/error",
                  payload: {
                    name: err.name,
                    timeStamp: Date.now(),
                    message: err.message
                  }
                },
                2000
              );*/
              console.log("Log in error : ", err);
            }
            context.jsforce.browser.connection
              .identity()
              .then(payload => {
                dispatch({ type: "loggedin", payload });
                console.log("Log in successful");
                /*dispatch(
                  {
                    type: "TOAST/success",
                    payload: {
                      timeStamp: Date.now(),
                      name: "Successfully Logged in",
                      message: "You have been logged in"
                    }
                  },
                  3000
                );*/
                localStorage.setItem("local_user", JSON.stringify(payload));
              })
              .catch(console.error);
          }
        );
      }}
    >
      Login
    </button>
  );
};

export default LoginButton;

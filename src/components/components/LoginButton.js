import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";

const LoginButton = () => {
  const [context, dispatch] = useContext(Context);
  console.log(context);
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  if (context.loggedIn || !rendered) return null;
  return (
    <button
      onClick={e => {
        window.onunload = () => {
          localStorage.removeItem("local_user");
          context.jsforce.browser.logout();
        };
        console.log(window.loginUrl);
        context.jsforce.browser.login(
          {
            loginUrl: window.loginUrl,
            popup: { width: 912, height: 600 }
          },
          function(err) {
            console.log(err);
            if (err) {
              return dispatch(
                {
                  type: "TOAST/error",
                  payload: {
                    name: err.name,
                    timeStamp: Date.now(),
                    message: err.message
                  }
                },
                2000
              );
            }
            context.jsforce.browser.connection
              .identity()
              .then(payload => {
                console.log(payload);
                dispatch({ type: "loggedin", payload });
                dispatch(
                  {
                    type: "TOAST/success",
                    payload: {
                      timeStamp: Date.now(),
                      name: "Successfully Logged in",
                      message: "You have been logged in"
                    }
                  },
                  3000
                );
                localStorage.setItem("local_user", JSON.stringify(payload));
              })
              .catch(console.error);
          }
        );
      }}
    >
      LoginLoginLoginLoginLoginLoginLoginLoginLoginLoginLogin
    </button>
  );
};

export default LoginButton;

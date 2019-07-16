import React, { useContext, useEffect, useState } from "react";
import Context from "./Context";

const LoginButton = () => {
  const [{ loggedIn, jsforce }, dispatch] = useContext(Context);
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  if (loggedIn || !rendered) return null;
  return (
    <button
      type="button"
      className="fancy"
      onClick={e => {
        window.onunload = () => {
          localStorage.removeItem("local_user");
          jsforce.browser.logout();
        };
        jsforce.browser.login(
          {
            loginUrl: window.loginUrl,
            popup: { width: 800, height: 600 }
          },
          function(err) {
            if (err) {
              // eslint-disable-next-line no-console
              console.error("Log in error : ", err);
            }
            jsforce.browser.connection
              .identity()
              .then(payload => {
                dispatch({ type: "loggedin", payload });
                // eslint-disable-next-line no-console
                console.log("Log in successful");
                localStorage.setItem("local_user", JSON.stringify(payload));
              })
              // eslint-disable-next-line no-console
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

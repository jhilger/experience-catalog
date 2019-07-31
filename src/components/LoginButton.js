import React, { useContext, useEffect, useState } from "react";
import DataService from "forcejs/dist/force.data-service";
import Context from "./Context";

const LoginButton = () => {
  const [{ loggedIn, oAuth }, dispatch] = useContext(Context);
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
        };

        oAuth
          .login()
          .then(oauthResult =>
            DataService.createInstance(oauthResult, { useProxy: false })
          )
          .then(() => {
            const service = DataService.getInstance();
            service.retrieve("User", service.getUserId()).then(response => {
              dispatch({ type: "loggedin", payload: response });
              localStorage.setItem("local_user", JSON.stringify(response));
            });
          });

        // jsforce.browser.login(
        //   {
        //     loginUrl: window.loginUrl,
        //     popup: { width: 800, height: 600 }
        //   },
        //   function(err) {
        //     if (err) {
        //       // eslint-disable-next-line no-console
        //       console.error("Log in error : ", err);
        //     }
        //     jsforce.browser.connection
        //       .identity()
        //       .then(payload => {
        //
        //         // eslint-disable-next-line no-console
        //         console.log("Log in successful");
        //
        //       })
        //       // eslint-disable-next-line no-console
        //       .catch(console.error);
        //   }
        // );
      }}
    >
      Login
    </button>
  );
};

export default LoginButton;

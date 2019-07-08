import React, { useContext, useState, Fragment } from "react";
import Context from "../Context";

const SubmitForApproval = ({ objectId }) => {
  const [context, dispatch] = useContext(Context);
  if (!context.loggedIn) return null;
  return (
    <button
      onClick={e => {
        context.jsforce.browser.connection.process.approval.submit(
          objectId,
          (err, response) => {
            if (err) {
              const timeStamp = Date.now();
              return dispatch({
                type: "TOAST/error",
                payload: {
                  timeStamp,
                  name: err.name,
                  message: err.message,
                  info: "Triggered by Submitting for Approval"
                }
              }, 3000);
            }
            console.log(response);
          }
        );
      }}
    >
      Submit for Approval
    </button>
  );
};

export default SubmitForApproval;

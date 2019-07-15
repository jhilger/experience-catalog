import React, { useContext } from "react";
import Context from "./Context";

const SubmitForApproval = ({ objectId }) => {
  const [{ loggedIn, jsforce }, dispatch] = useContext(Context);
  if (!loggedIn) return null;
  return (
    <button
      type="button"
      onClick={e => {
        jsforce.browser.connection.process.approval.submit(
          objectId,
          (err, response) => {
            if (err) {
              const timeStamp = Date.now();
              return dispatch(
                {
                  type: "TOAST/error",
                  payload: {
                    timeStamp,
                    name: err.name,
                    message: err.message,
                    info: "Triggered by Submitting for Approval"
                  }
                },
                3000
              );
            }
          }
        );
      }}
    >
      Submit for Approval
    </button>
  );
};

export default SubmitForApproval;

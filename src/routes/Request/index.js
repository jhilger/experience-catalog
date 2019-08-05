import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Context from "../../components/Context";

const RequestPage = ({ match }) => {
  const [{ requests }] = useContext(Context);
  const requestRecord = requests.data[match.params.id];
  console.log(requestRecord);
  if (!requestRecord) return <Redirect to="/" />;
  return (
    <div>
      <span>
        <h1>{requestRecord.Name}</h1>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
          <label htmlFor="contact">Contact to Invite</label>
          <span id="contact">{requestRecord.Contact_to_Invite__r.Name}</span>
        </div>
      </span>
    </div>
  );
};

export default RequestPage;

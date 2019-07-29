import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Context from "../../components/Context";

const RequestPage = ({ match }) => {
  const [{ requests }] = useContext(Context);
  const request = requests.records.find(req => req.Id === match.params.id);
  if (!request) return <Redirect to="/" />;
  return (
    <div>
      <span>
        <h1>{request.Name}</h1>
        <div>
          <label>Contact to Invite</label>
          <span>{request.Contact_to_Invite__r.Name}</span>
        </div>
      </span>
    </div>
  );
};

export default RequestPage;

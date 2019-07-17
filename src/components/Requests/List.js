import React, { useContext } from "react";
import Context from "../Context";

const RequestList = () => {
  const [{ requests }] = useContext(Context);
  return (
    <div>
      <h2>Requests</h2>
      {requests.records.map(
        ({ Name, Id, Contact_to_Invite__r, Event_Date__c }, i) => {
          const event = new Date(`${Event_Date__c}T00:00:00`);
          const offset = event.getTimezoneOffset() / 60;
          const duration = `${event}-${offset}:00`;
          return (
            <div key={Id}>
              {Name}-{Contact_to_Invite__r.Name}-
              {new Date(duration).toLocaleDateString()}
            </div>
          );
        }
      )}
    </div>
  );
};

export default RequestList;

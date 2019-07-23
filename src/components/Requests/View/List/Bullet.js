import React, { useContext } from "react";
import Context from "../../../Context";

const RequestList = ({ label, type }) => {  
  const [{ tempReqData }] = useContext(Context);
  return (
    <React.Fragment>
      <h2>{label}</h2>
      <div className="exp-req-list">
      <ul>
        {tempReqData.map(({ id, experience, url, status, contact, date }) => (
          (status === type) ?
            <li key={id}>
              <a targer="_blank" href={url}>
                <h5>{contact}</h5>
                {experience}<span className="divider">|</span>{date}
              </a>
            </li>
            : null
        ))}
      </ul>
      </div>
    </React.Fragment>
  );
};

export default RequestList;


/*
const RequestList = () => {
  const [{ requests }] = useContext(Context);
  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.records.map(
        (
          { Name, Id, Contact_to_Invite__r: contact, Event_Date__c: eventDate },
          i
        ) => {
          const event = new Date(`${eventDate}T00:00:00`);
          const offset = event.getTimezoneOffset() / 60;
          const duration = `${event}-${offset}:00`;
          return (
            <div key={Id}>
              {Name}-{contact.Name}-{new Date(duration).toLocaleDateString()}
            </div>
          );
        }
      )}
    </div>
  );
};
*/
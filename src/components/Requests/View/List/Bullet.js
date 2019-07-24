import React, { useContext } from "react";
import Context from "../../../Context";

const RequestList = ({ label, type }) => {
  const [{ requests }] = useContext(Context);
  return (
    <div>
      <h2>{label}</h2>
      <div className="exp-req-list">
      <ul>
          {requests.records.map(({ Status__c : status , Event_Date__c : eventDate, Id, Contact_to_Invite__r : contact, Experience__r : experience}) => {
            return (status === type && new Date().getTime() < new Date(eventDate).getTime()) ?
          <li key={Id}>
                <a target="_blank" rel="noopener noreferrer" href={`${process.env.REACT_APP_LOGIN_URL}${Id}`}>
              <h5>{contact.Name}</h5>
              {experience.Name}<span className="divider">|</span>{eventDate}
            </a>
          </li>
          : '';
        }
      )}
      </ul>
      </div>
    </div>
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
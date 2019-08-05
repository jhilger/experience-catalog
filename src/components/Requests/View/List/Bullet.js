import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../Context";

const RequestList = ({ label, type }) => {
  const [{ requests, experienceId }] = useContext(Context);
  const requestRecords = requests[type].map(record => requests.data[record]);
  return (
    <div>
      <h2>{label}</h2>
      <div className="exp-req-list">
        <ul>
          {requestRecords.map(
            ({
              Event_Date__c: eventDate,
              Id,
              Contact_to_Invite__r: contact,
              Experience__r: experience
            }) => (
              <li key={Id}>
                <Link to={`/requests/single/${Id}`}>
                  <h5>{contact ? contact.Name : "No Contact Name"}</h5>
                  {experience ? experience.Name : "N/A Experience"}
                  <span className="divider">|</span>
                  {eventDate}
                </Link>
              </li>
            )
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

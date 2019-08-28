import React, { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Context from "../../../Context";

const RequestList = ({ label }) => {
  const [{ requests }] = useContext(Context);
  const [filterButton, setFilterButton] = useState("all");
  const [count, setCount] = useState(requests.data.length);

  return (
    <>
      <h2>{label}</h2>
      <div className="exp-req-filter">
        <button
          type="button"
          className={filterButton === "all" ? "filter active" : "filter"}
          onClick={() => setFilterButton("all")}
        >
          All
        </button>
        <button
          type="button"
          className={filterButton === "submitted" ? "filter active" : "filter"}
          onClick={() => setFilterButton("submitted")}
        >
          Submitted
        </button>
        <button
          type="button"
          className={filterButton === "approved" ? "filter active" : "filter"}
          onClick={() => setFilterButton("approved")}
        >
          Approved
        </button>
        <button
          type="button"
          className={filterButton === "rejected" ? "filter active" : "filter"}
          onClick={() => setFilterButton("rejected")}
        >
          Rejected
        </button>
      </div>
      <div className="exp-list">
        <ul>
          {requests.data.map(
            ({
              Event_Date__c: eventDate,
              Id,
              Contact_to_Invite__r: contact,
              Experience__r: experience,
              Status__c: status
            }) => (
              <CSSTransition
                key={Id}
                in={
                  status.toLowerCase() === filterButton ||
                  filterButton === "all"
                }
                timeout={400}
                classNames="reqanim"
                onEntered={() => setCount(count + 1)}
                onExited={() => setCount(count - 1)}
              >
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${process.env.REACT_APP_LOGIN_URL}${Id}`}
                  >
                    <h5>
                      {contact ? contact.Name : "No Contact Name"}
                      <span>{status}</span>
                    </h5>
                    {experience ? experience.Name : "N/A Experience"}
                    <span className="divider">|</span>
                    {eventDate}
                  </a>
                </li>
              </CSSTransition>
            )
          )}
          <li className={count === 0 ? "no-results active" : "no-results"}>
            Sorry, no matches found.
          </li>
        </ul>
      </div>
    </>
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

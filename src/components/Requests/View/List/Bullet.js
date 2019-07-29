import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Context from "../../../Context";
import Modal from "../../../Modal";
import UpdateSingleRequest from "../../Update";
import { onRequestCLick } from "../../Create/actionCreators";

const RequestList = ({ history, experience }) => {
  const [showReqs, setShowReqs] = useState(false);
  const [{ requests }, dispatch] = useContext(Context);
  console.log(requests);
  return (
    <div>
      <h2>Requests</h2>
      {requests.records.map((request, i) => {
        const {
          Name,
          Id,
          Contact_to_Invite__r: contact,
          Event_Date__c: eventDate
        } = request;
        const event = new Date(`${eventDate}T00:00:00`);
        const offset = event.getTimezoneOffset() / 60;
        const duration = `${event}-${offset}:00`;
        return (
          <React.Fragment key={request.Id}>
            <div>
              <button
                type="button"
                className="info"
                onClick={() => {
                  history.push(`${history.location.pathname}#entry`);
                  setShowReqs(!showReqs);
                  console.log("hello");
                  dispatch(onRequestCLick(request));
                }}
              >
                {contact ? (
                  <div key={Id}>
                    {Name}-{contact.Name}-
                    {new Date(duration).toLocaleDateString()}
                  </div>
                ) : (
                  <div key={Id}>
                    {"No contact added"}
                    {new Date(duration).toLocaleDateString()}
                  </div>
                )}
              </button>
            </div>
            <Modal
              activate={bool => {
                if (bool === false || setShowReqs)
                  history.push(history.location.pathname);
                setShowReqs(typeof bool === "boolean" ? bool : !setShowReqs);
              }}
              active={showReqs}
            >
              <UpdateSingleRequest experience={experience} />
            </Modal>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default withRouter(RequestList);

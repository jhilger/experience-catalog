import React, { useContext } from "react";
import Context from "../../Context";
import Form from "../../Form";
import TypeAhead from "../../TypeAhead";
import "../../../scss/form.scss";

const SingleRequestCreate = ({ initialValues = {} }) => {
  const [{ user }, dispatch] = useContext(Context);
  //const contact = contacts.data[contactId];

  console.log('User ', user);
  console.log('Initial Values ', initialValues);

  return (
    <Form
      onSubmit={console.log}
      initialValues={{
        ...initialValues,
        //Contact_to_Invite__c: contactId,
        Requester__c: user.user_id
      }}
    >
      <label htmlFor="requester">Requester</label><h5 id="requester">{user.display_name}</h5>
      <label htmlFor="experinceName">Experience</label><h5 id="experienceName">{initialValues.ExperienceName}</h5>
      <label htmlFor="partnerName">Strategic Partner</label><h5 id="partnerName">{initialValues.StrategicPartnerName}</h5>
      <label htmlFor="requirements">Requirements</label><p id="requirements">{initialValues.Requirements__c}</p>
      <TypeAhead
        name="Contact_to_Invite__c"
        label="Contact"
        sObject="Contact"
        onChange={record => {
          dispatch({
            type: "CONT/data",
            payload: record
          });
          dispatch({
            type: "CONT/Id",
            payload: record
          });
        }}
        value=""
      />
      <label htmlFor="eventDate">Event Date</label><input id="eventDate" name="eventDate" type="date" placeholder="mm/dd/yyyy" required/>
      <label htmlFor="description">Request Details</label><textarea id="description" name="description" rows="2" required></textarea>
      <button type="submit" className="fancy">Submit Request</button>
    </Form>
  );
};

export default SingleRequestCreate;


/*const SingleRequestCreate = ({ initialValues = {} }) => {
  const [{ user, contactId, contacts }, dispatch] = useContext(Context);
  const contact = contacts.data[contactId];
  return (
    <Form
      onSubmit={console.log}
      initialValues={{
        ...initialValues,
        Contact_to_Invite__c: contactId,
        Requester__c: user.user_id
      }}
    >
      <TypeAhead
        name="Contact_to_Invite__c"
        label="Contact"
        sObject="Contact"
        onChange={record => {
          dispatch({
            type: "CONT/data",
            payload: record
          });
          dispatch({
            type: "CONT/Id",
            payload: record
          });
        }}
        value={contact}
      />
      <button type="submit">Submit</button>
    </Form>
  );
};*/
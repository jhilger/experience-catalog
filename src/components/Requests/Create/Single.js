import React, { useContext } from "react";
import Context from "../../Context";
import Form from "../../Form";
import InputField from "../../Form/InputField";
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
        Requester__c: user.user_id,
        Description__c : ""
      }}
    >
      <label htmlFor="requester">Requester</label><h5 id="requester">{user.display_name}</h5>      
      <label htmlFor="partnerName">Strategic Partner</label><h5 id="partnerName">{initialValues.StrategicPartnerName}</h5>
      <label htmlFor="experinceName">Experience</label><h5 id="experienceName">{initialValues.ExperienceName}</h5>
      <label htmlFor="requirements">Requirements</label><p id="requirements">{initialValues.Requirements__c}</p>
      <TypeAhead
        name="Contact_to_Invite__c"
        label="Contact"
        sObject="Contact"
        className="exp-typeahead"
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
      < InputField 
        name="Event_Date__c"
        label="Event Date"
        placeholder = "mm/dd/yyyy"
        component = "input"
        includeInBlob={true}
        type="date"
        required={true}
        value={initialValues.Event_Date__c}
      />
      < InputField
        name="Description__c"
        label="Business Case"
        component="textarea"
        type="text"
        includeInBlob={true}
        rows={2}
        required={true}
      />
      <button type="submit" className="fancy">Submit Request</button>
    </Form>
  );
};

export default SingleRequestCreate;

/*
 <label htmlFor="eventDate">Event Date</label><input id="eventDate" name="Event_Date__c" type="date" placeholder="mm/dd/yyyy" required/>
<label htmlFor="description">Request Details</label><textarea id="description" name="Description__c" rows="2" required></textarea>

*/

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
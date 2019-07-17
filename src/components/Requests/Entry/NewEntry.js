import React from "react";
import Form, { InputField } from "../../Form";
import TypeAhead from "../../TypeAhead";

const NewEntry = ({ experience }) => (
  <Form onSubmit={console.log}>
    <h2>{experience.Name}</h2>
    <TypeAhead name="Contact_to_Invite__c" label="Contact" sObject="Contact" />
    <InputField name="Event_Date__c" label="Event Date" />
    <button type="submit">Submit</button>
  </Form>
);

export default NewEntry;

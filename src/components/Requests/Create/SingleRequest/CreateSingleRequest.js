import React, { useContext } from "react";
import Context from "../../../Context";
import Form, { InputField, Debug } from "../../../Form";
import TypeAhead from "../../../TypeAhead";
import { onContactChange, onSubmit } from "../actionCreators";

const SingleRequestCreate = ({ initialValues = {}, onSuccess = () => {} }) => {
  const [{ user, contactId, contacts }, dispatch] = useContext(Context);
  const contact = contacts.data[contactId];
  console.log(user.Id);
  return (
    <Form
      onSubmit={(...args) => {
        dispatch(onSubmit(onSuccess, ...args));
        console.log(...args);
      }}
      initialValues={{
        ...initialValues,
        Status__c: "Draft",
        Contact_to_Invite__c: contactId,
        Requester__c: user.Id
      }}
    >
      <TypeAhead
        required
        name="Contact_to_Invite__c"
        label="Contact"
        sObject="Contact"
        onChange={record => dispatch(onContactChange(record))}
        value={contact}
      />
      <InputField
        component="textarea"
        label="Customer Restrictions"
        name="Customer_Restrictions__c"
      />
      <InputField
        required
        type="date"
        label="Event Date"
        name="Event_Date__c"
      />
      <InputField required component="select" label="Status" name="Status__c">
        <option value="Draft">Draft</option>
        <option value="Submitted">Submitted</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </InputField>
      <Debug />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default SingleRequestCreate;

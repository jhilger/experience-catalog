import React, { useContext } from "react";
import Context from "../../../Context";
import Form, { InputField, Debug } from "../../../Form";
import TypeAhead from "../../../TypeAhead";
import { onContactChange, onSubmitUpdate } from "../actionCreators";

const UpdateSingleRequest = ({ initialValues = {}, onSuccess = () => {} }) => {
  const [
    { user, contactId, contacts, requestId, requests },
    dispatch
  ] = useContext(Context);
  const contact = contacts.data[contactId];
  const request = requests.data[requestId];
  console.log(request);
  return (
    <Form
      onSubmit={(...args) => {
        dispatch(onSubmitUpdate(onSuccess, request, ...args));
        console.log(...args);
      }}
      initialValues={{
        ...initialValues,
        ...request,
        Contact_to_Invite__c: contactId,
        Requester__c: user.user_id
      }}
    >
      <TypeAhead
        required
        name="Contact_to_Invite__c"
        label="Contact"
        sObject="Contact"
        onChange={record => dispatch(onContactChange(record))}
        value={request.Contact_to_Invite__r}
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

export default UpdateSingleRequest;

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from "react";
import moment from "moment";
import DataService from "forcejs/dist/force.data-service";
import loadedQuery from "../../../routes/Home/loadedQuery";
import Context from "../../Context";
import Form from "../../Form";
import InputField from "../../Form/InputField";
import TypeAhead from "../../TypeAhead";
import SingleDatePickerWrapper from "../../SingleDatePickerWrapper";
import OpportunityTypeAhead from "./OpportunityTypeahead";
import "../../../scss/form.scss";

const SingleRequestCreate = ({
  initialValues = {},
  experienceName,
  pricingTier,
  strategicPartner,
  onSuccess
}) => {
  const [state, dispatch] = useContext(Context);
  const { user, jsforce } = state;
  const service = DataService.getInstance();
  // const contact = contacts.data[contactId];

  return (
    <Form
      onSubmit={(event, values) => {
        service
          .create("Strategic_Partner_Request__c", values)
          .then(() => loadedQuery(jsforce, state, dispatch))
          .then(onSuccess)
          .catch(console.error);
      }}
      initialValues={{
        ...initialValues,
        // Contact_to_Invite__c: contactId,
        Requester__c: user.Id,
        Status__c: "Draft",
        Description__c: "",
        Event_Date__c: initialValues.Event_Date__c
          ? moment(initialValues.Event_Date__c).format("YYYY-MM-DD")
          : ""
      }}
    >
      <label htmlFor="requester">Requester</label>
      <h5 id="requester">{user.Name}</h5>
      <label htmlFor="experinceName">Experience</label>
      <h5 id="experienceName">{experienceName}</h5>
      <label htmlFor="requirements">Tier</label>
      {pricingTier && <h5 id="experienceTier">{pricingTier.Name}</h5>}
      <TypeAhead
        name="Contact_to_Invite__c"
        required
        label="Contact"
        sObject="Contact"
        className="exp-typeahead"
        searchSelectionLabel={item => `${item.Name} of ${item.Account.Name}`}
        dropDownItemLabelField={item => (
          <span>{`${item.Name} of ${item.Account.Name}`}</span>
        )}
        fields={[
          "Name",
          "Account.Name",
          "Account.Id",
          "Account.Total_Opportunities__c"
        ]}
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
        placeholder="contact to invite"
      />
      <OpportunityTypeAhead />
      <SingleDatePickerWrapper
        name="Event_Date__c"
        label="Event Date"
        value={
          initialValues.Event_Date__c ? moment(initialValues.Event_Date__c) : ""
        }
        placeholder="date of requested event"
      />
      <InputField
        name="Description__c"
        label="Business Case"
        component="textarea"
        type="text"
        includeInBlob
        rows={2}
        required
        placeholder="business case for requested event"
      />
      <button type="submit" className="fancy">
        Submit Request
      </button>
    </Form>
  );
};

export default SingleRequestCreate;

/*
 <label htmlFor="eventDate">Event Date</label><input id="eventDate" name="Event_Date__c" type="date" placeholder="mm/dd/yyyy" required/>
<label htmlFor="description">Request Details</label><textarea id="description" name="Description__c" rows="2" required></textarea>

*/

/*
const SingleRequestCreate = ({ initialValues = {} }) => {
  const [{ user, contactId, contacts }, dispatch] = useContext(Context);
  const contact = contacts.data[contactId];
  return (
    <Form
      onSubmit={console.log}
      initialValues={{
        ...initialValues,
        Contact_to_Invite__c: contactId,
        Requester__c: user.Id
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
}; 
*/

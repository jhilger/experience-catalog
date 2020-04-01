import React, { useContext } from "react";
import Context from "../../Form/Context";
import TypeAhead from "../../TypeAhead";

const OpportunityTypeAhead = () => {
  const [state] = useContext(Context);
  console.log(state);
  if (!state) return null;
  if (!state.fields) return null;
  if (!state.fields.Contact_to_Invite__c) return null;
  if (!state.fields.Contact_to_Invite__c.record) return null;
  if (!state.fields.Contact_to_Invite__c.record.Account) return null;
  if (!state.fields.Contact_to_Invite__c.record.Account.Id) return null;
  if (!state.fields.Contact_to_Invite__c.record.Account.Total_Opportunities__c)
    return null;
  return (
    <TypeAhead
      name="Opportunity__c"
      required
      label="Opportunity"
      sObject="Opportunity"
      className="exp-typeahead"
      extraSearchFilterPhrase={`Account.Id = '${
        state.fields.Contact_to_Invite__c.record.Account.Id
      }'`}
      // searchSelectionLabel={item => `${item.Name} of ${item.Account.Name}`}
      // dropDownItemLabelField={}
      fields={["Name"]}
      value=""
      placeholder="contact to invite"
    />
  );
};

export default OpportunityTypeAhead;

import React, { useContext } from "react";
import Context from "../../Context";
import Form from "../../Form";
import TypeAhead from "../../TypeAhead";

const SingleRequestCreate = ({ initialValues = {} }) => {
  const [{ user, contactId }] = useContext(Context);
  return (
    <Form
      onSubmit={console.log}
      initialValues={{
        ...initialValues,
        Contact_to_Invite__c: contactId,
        Requester__c: user.user_id
      }}
    >
      {!contactId && (
        <TypeAhead
          name="Contact_to_Invite__c"
          label="Contact"
          sObject="Contact"
        />
      )}
      <button type="submit">Submit</button>
    </Form>
  );
};

export default SingleRequestCreate;

import React from "react";
import Button from "../../components/Button";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import TypeAhead from "../../components/TypeAhead";
import AdditionalFields, { Field } from "../../components/AdditionalFields";
import Form, { InputField, Debug } from "../../components/Form";
import SubmitForApproval from "../../components/SubmitForApproval";

const SubmitForm = () => (
  <Form
    // onSubmit={console.log}
    autoComplete="off"
  >
    <div>
      <SubmitForApproval objectId="001E000000B78SG" />
    </div>
    <AdditionalFields
      jsonFieldName="additionalFields__c"
      humanReadableFieldName="Additional_Information__c"
      formatting={{
        before: "<ul><li>",
        between: "</li><li>",
        field: c => `<label>${c.label}:</label> <span>${c.value}</span>`,
        after: "</li></ul>"
      }}
      // onChange={v => console.log(JSON.stringify(v))}
    >
      <TypeAhead name="AccountId" label="Account" />
      <Field name="name" label="Name" />
      <Field name="phone-number" label="Phone" />
      <InputField
        includeInBlob
        component="textarea"
        name="Description"
        label="Details"
        validate={field => {
          if (!field.value)
            return [
              {
                type: "error",
                message: "You need to fill in this field",
                name: field.name
              }
            ];
        }}
      />
      <Debug styles={{ color: "#aaa" }} />
    </AdditionalFields>
    <Button type="submit">Submit</Button>
  </Form>
);

export default SubmitForm;

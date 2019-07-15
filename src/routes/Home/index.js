import React, { useState, useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import SideNav from "../../components/SideNav";
import Button from "../../components/Button";

import Card from "../../components/Card";

import Context from "../../components/Context";
import TypeAhead from "../../components/TypeAhead";
import AdditionalFields, { Field } from "../../components/AdditionalFields";
import Form, { InputField, Debug } from "../../components/Form";
import SubmitForApproval from "../../components/SubmitForApproval";

const Home = () => {
  const [{ loggedIn, jsforce, user, filtered }, dispatch] = useContext(Context);
  const [expanded, setExpanded] = useState(false);
  // const [filtered, setFiltered] = useState(experiences);
  const [rendered, setRendered] = useState(false);
  //  WORK ON THIS

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (rendered && loggedIn) {
      jsforce.browser.connection.query(
        "SELECT Id, Strategic_Partner__r.account__r.Name, Name, Experience_Type__c, Info__c, Keep_In_Mind__c, Partnership_Details_Requirements__c, Image_URL__c " +
          "FROM Experience__c " +
          "WHERE Strategic_Partner__r.Status__c = 'Current Partner'",
        (err, result) => {
          // eslint-disable-next-line no-console
          if (err) console.error(err);
          const records = result.records.map(record => {
            record.display = true;
            record.default = "img/davisestates3.jpg";
            return record;
          });

          dispatch({
            type: "EXP/init",
            payload: records
          });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered, loggedIn]);

  if (!rendered) return null;
  return (
    <React.Fragment>
      {loggedIn ? (
        <div style={{ paddingLeft: "68px" }}>
          <h2>Welcome {user.display_name}</h2>
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
                field: c =>
                  `<label>${c.label}:</label> <span>${c.value}</span>`,
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
        </div>
      ) : (
        <h1 style={{ paddingLeft: "68px" }}>
          You need to Log in to view this site
        </h1>
      )}

      <SideNav
        onToggle={newExpanded => {
          setExpanded(newExpanded);
        }}
      />
      {filtered.length && (
        <main className={expanded ? "expanded" : ""}>
          <h1 className="exp-title">
            Customer Experience <span>Catalog</span>
          </h1>

          <div className="grid-x grid-margin-x grid-margin-y">
            {filtered.map((exp, i) => (
              <CSSTransition
                key={exp.Id}
                in={exp.display}
                timeout={300}
                classNames="cardanim"
                unmountOnExit
              >
                <Card sort={i} experience={exp} />
              </CSSTransition>
            ))}
          </div>
        </main>
      )}
    </React.Fragment>
  );
};

export default Home;

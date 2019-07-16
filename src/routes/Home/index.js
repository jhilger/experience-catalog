import React, { useState, useContext, useEffect } from "react";
import SideNav from "../../components/SideNav";
import Card from "../../components/Card";
import Context from "../../components/Context";
import Header from "../../components/Header";

// Experience is in window.experiences
// SideNavFilters is in window.sideNavFilters

const performQuery = (jsforce, query) =>
  new Promise((resolve, reject) => {
    jsforce.browser.connection.query(query, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

const Home = () => {
  const [{ loggedIn, jsforce, filtered, user }, dispatch] = useContext(Context);

  const [expanded, setExpanded] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (rendered && loggedIn) {
      Promise.all([
        performQuery(
          jsforce,
          [
            "SELECT",
            [
              "Id",
              "Strategic_Partner__r.account__r.Name",
              "Name",
              "Experience_Type__c",
              "Info__c",
              "Keep_In_Mind__c",
              "Experience_Type2__r.Id",
              "Experience_Type2__r.Name",
              "Experience_Type2__r.Image_Path__c",
              "Experience_Type2__r.Short_Name__c",
              "Experience_Type2__r.Alt_Text__c",
              "Partnership_Details_Requirements__c",
              // eslint-disable-next-line prettier/prettier
            "Image_URL__c",
            ].join(", "),
            "FROM Experience__c",
            // eslint-disable-next-line prettier/prettier
        "WHERE Strategic_Partner__r.Status__c = 'Current Partner'",
          ].join(" ")
        ),
        performQuery(
          jsforce,
          [
            "SELECT",
            [
              "Id",
              // eslint-disable-next-line prettier/prettier
              "Name",
            ].join(", "),
            "FROM Strategic_Partner_Request__c",
            "WHERE",
            ["Status__c = 'Draft'", `Requester__c = '${user.user_id}'`].join(
              " AND "
            )
          ].join(" ")
        )
      ])
        .then(([experience, partnerRequests]) => {
          const { records } = experience;

          dispatch({
            type: "EXP/init",
            payload: records
          });
          dispatch({
            type: "REQ/init",
            payload: partnerRequests.records
          });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
          dispatch({
            type: "ERROR",
            payload: err
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered, loggedIn]);

  if (!rendered) return null;
  return (
    <React.Fragment>
      <SideNav onToggle={() => setExpanded(!expanded)} />
      <main className={expanded ? "expanded" : ""}>
        <Header />
        <div className="grid-x grid-margin-x grid-margin-y">
          {filtered.map((exp, i) => (
            <Card key={exp.Id} sort={i} experience={exp} />
          ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;

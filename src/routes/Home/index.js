import React, { useState, useContext, useEffect } from "react";
import SideNav from "../../components/SideNav";
import VisualExperienceList from "../../components/Experiences/View/List/Visual";
import Context from "../../components/Context";
import Header from "../../components/Header";
import loadedQuery from "./loadedQuery";

// Experience is in window.experiences
// SideNavFilters is in window.sideNavFilters

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const { loggedIn, jsforce } = state;

  const [expanded, setExpanded] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  /*useEffect(() => {
    if (rendered && loggedIn) {
      Promise.all([
        performQuery(
          jsforce,
          [
            "SELECT",
            [
              "Id",
              "Strategic_Partner__r.Name",
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
            //TODO: (ISAAC) Using ! to filter out disabled experiences, probably needs a field to control this
            // eslint-disable-next-line prettier/prettier
        "WHERE Strategic_Partner__r.Status__c = 'Current Partner' AND  (NOT Name LIKE '!%')",
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
  }, [rendered, loggedIn]);*/

  useEffect(() => {
    if (rendered && loggedIn) {
      loadedQuery(jsforce, state, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered, loggedIn]);

  if (!rendered) return null;
  return (
    <React.Fragment>
      <SideNav onToggle={() => setExpanded(!expanded)} />
      <main className={expanded ? "expanded" : ""}>
        <Header />
        <VisualExperienceList />
      </main>
    </React.Fragment>
  );
};

export default Home;

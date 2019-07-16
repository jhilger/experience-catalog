import React, { useState, useContext, useEffect } from "react";
import SideNav from "../../components/SideNav";
import Card from "../../components/Card";
import Context from "../../components/Context";
import Header from "../../components/Header";
import Modal from "../../components/Modal";

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
  const [{ loggedIn, jsforce, filtered }, dispatch] = useContext(Context);

  const [expanded, setExpanded] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [modal, setModal] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (rendered && loggedIn) {
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
            "Image_URL__c"
          ].join(", "),
          "FROM Experience__c",
          // eslint-disable-next-line prettier/prettier
        "WHERE Strategic_Partner__r.Status__c = 'Current Partner'",
        ].join(" ")
      )
        .then(result => {
          const records = result.records.map(record => {
            record.display = true;
            record.default = "img/davisestates3.jpg";
            return record;
          });

          dispatch({
            type: "EXP/init",
            payload: records
          });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered, loggedIn]);

  const modalContent = type => {
    setModal(type);
  };

  const activateModal = toggle => {
    setActive(toggle);
  };

  if (!rendered) return null;
  return (
    <React.Fragment>
      <SideNav onToggle={() => setExpanded(!expanded)} />
      <main className={expanded ? "expanded" : ""}>
        <Header activateModal={activateModal} modalContent={modalContent} />
        <div className="grid-x grid-margin-x grid-margin-y">
          {filtered.map((exp, i) => (
            <Card key={exp.Id} sort={i} experience={exp} />
          ))}
        </div>
      </main>
      <Modal activateModal={activateModal} active={active} modal={modal} />
    </React.Fragment>
  );
};

export default Home;

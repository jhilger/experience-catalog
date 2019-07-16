import React, { useState, useContext, useEffect } from "react";
import SideNav from "../../components/SideNav";
import Card from "../../components/Card";
import Context from "../../components/Context";
import Header from "../../components/Header";
import Modal from "../../components/Modal";

// Experience is in window.experiences
// SideNavFilters is in window.sideNavFilters

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
      jsforce.browser.connection.query(
        "SELECT Id, Strategic_Partner__r.account__r.Name, Name, Experience_Type__c, Info__c, Keep_In_Mind__c, Partnership_Details_Requirements__c, Image_URL__c " +
          "FROM Experience__c " +
          "WHERE Strategic_Partner__r.Status__c = 'Current Partner'",
        (err, result) => {
          // eslint-disable-next-line no-console
          console.error(err);
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
            <Card sort={i} experience={exp} />
          ))}
        </div>
      </main>
      <Modal activateModal={activateModal} active={active} modal={modal} />
    </React.Fragment>
  );
};

export default Home;

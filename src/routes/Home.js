import React, { useState, useContext, useEffect } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { CSSTransition } from "react-transition-group";
import "../scss/foundation.css";
import "../scss/fonts.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../scss/global.scss";
import "../scss/sidenav.scss";
import "../scss/cardanimations.scss";
import wine from "../img/wine.svg";
import cars from "../img/cars.svg";
import art from "../img/art.svg";
import music from "../img/music.svg";
import outdoor from "../img/outdoor.svg";
import trophy from "../img/trophy.svg";
import home from "../img/home2.svg";
import Card from "../components/Card";
import Context from "../components/Context";
import Header from "../components/Header";
import Modal from "../components/Modal";

// Experience is in window.experiences
// SideNavFilters is in window.sideNavFilters

const Home = () => {
  const [{ experiences, loggedIn, jsforce }, dispatch] = useContext(Context);

  const [expanded, setExpanded] = useState(false);
  const [filtered, setFiltered] = useState(experiences);
  const [rendered, setRendered] = useState(false);
  const [modal, setModal] = useState("");
  const [active, setActive] = useState(false);

  //  WORK ON THIS
  const sideNavFilters = experiences.reduce((types, experience) => {
    if (!types.includes(experience.Experience_Type__c)) {
      types.push(experience.Experience_Type__c.toLowerCase());
    }
    return types;
  }, []);

  useEffect(() => {
    setRendered(true);
  }, []);
  useEffect(() => {
    setFiltered(experiences);
  }, [experiences]);
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
  }, [rendered, dispatch, loggedIn, jsforce.browser]);

  const filterItems = query =>
    experiences.map(exp => {
      if (query === "home") {
        exp.display = true;
      } else {
        exp.display = exp.Experience_Type__c.toLowerCase() === query;
      }
      return exp;
    });

  const modalContent = type => {
    setModal(type);
  };

  const activateModal = toggle => {
    setActive(toggle);
  };

  if (!rendered) return null;
  return (
    <React.Fragment>
      <SideNav
        onSelect={selected => {
          console.log("you selected", selected);
          setFiltered(filterItems(selected));
        }}
        onToggle={newExpanded => {
          setExpanded(newExpanded);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <img className="exp-nav-icon" src={home} alt="Home" />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>

          {sideNavFilters.includes("wine") ? (
            <NavItem eventKey="wine">
              <NavIcon>
                <img
                  className="exp-nav-icon"
                  src={wine}
                  alt="Wine Expeiences"
                />
              </NavIcon>
              <NavText>Wine</NavText>
            </NavItem>
          ) : (
            ""
          )}

          {sideNavFilters.includes("driving") ? (
            <NavItem eventKey="driving">
              <NavIcon>
                <img
                  className="exp-nav-icon"
                  src={cars}
                  alt="Driving Expeiences"
                />
              </NavIcon>
              <NavText>Driving</NavText>
            </NavItem>
          ) : (
            ""
          )}

          {sideNavFilters.includes("art") ? (
            <NavItem eventKey="art">
              <NavIcon>
                <img className="exp-nav-icon" src={art} alt="Art Expeiences" />
              </NavIcon>
              <NavText>Art</NavText>
            </NavItem>
          ) : (
            ""
          )}

          {sideNavFilters.includes("music") ? (
            <NavItem eventKey="music">
              <NavIcon>
                <img
                  className="exp-nav-icon"
                  src={music}
                  alt="Music Expeiences"
                />
              </NavIcon>
              <NavText>Music</NavText>
            </NavItem>
          ) : (
            ""
          )}

          {sideNavFilters.includes("outdoor") ? (
            <NavItem eventKey="outdoor">
              <NavIcon>
                <img
                  className="exp-nav-icon"
                  src={outdoor}
                  alt="Outdoor Expeiences"
                />
              </NavIcon>
              <NavText>Outdoor</NavText>
            </NavItem>
          ) : (
            ""
          )}

          {sideNavFilters.includes("sports") ? (
            <NavItem eventKey="sports">
              <NavIcon>
                <img
                  className="exp-nav-icon"
                  src={trophy}
                  alt="Sports Expeiences"
                />
              </NavIcon>
              <NavText>Sports</NavText>
            </NavItem>
          ) : (
            ""
          )}
        </SideNav.Nav>
      </SideNav>
      <main className={expanded ? "expanded" : ""}>
        <Header activateModal={activateModal} modalContent={modalContent} />
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
      <Modal activateModal={activateModal} active={active} modal={modal} />
    </React.Fragment>
  );
};

export default Home;

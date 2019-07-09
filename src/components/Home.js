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
import Card from "./Card";

import Context from "./Context";
import TypeAhead from "./components/TypeAhead";
import AdditionalFields, { Field } from "./components/AdditionalFields";
import Form, { InputField, Debug } from "./components/Form";
import SubmitForApproval from "./components/SubmitForApproval";

//Experience is in window.experiences
//SideNavFilters is in window.sideNavFilters

const Home = () => {
  const [context] = useContext(Context);

  const [expanded, setExpanded] = useState(false);
  const [filtered, setFiltered] = useState(window.experiences);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);
  useEffect(() => {
    if (rendered && context.loggedIn) {
      context.jsforce.browser.connection.query(
        "SELECT Id, Strategic_Partner__r.Account_Name__r.Name FROM Experiences__c WHERE Strategic_Partner__r.Status__c = 'Current Partner'",
        (err, result) => {
          console.log(result)
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered, context.loggedIn])

  const filterItems = query => {
    return window.experiences.map(exp => {
      if (query === "home") {
        exp.display = true;
      } else {
        exp.display = exp.type === query ? true : false;
      }
      return exp;
    });
  };

  if (!rendered) return null;
  return (
    <React.Fragment>
      {context.loggedIn ? (
        <div style={{paddingLeft: '68px'}}>
          <h2>Welcome {context.user.display_name}</h2>
          <Form onSubmit={console.log} autoComplete="off">
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
              onChange={v => console.log(JSON.stringify(v))}
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
                  return;
                }}
              />
              <Debug styles={{ color: "#aaa" }} />
            </AdditionalFields>
            <button type="submit">Submit</button>
          </Form>
        </div>
      ) : (
        <h1 style={{paddingLeft: '68px'}}>You need to Log in to view this site</h1>
      )}

      <SideNav
        onSelect={selected => {
          console.log("you selected", selected);
          setFiltered(filterItems(selected));
        }}
        onToggle={expanded => {
          setExpanded(expanded);
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

          {window.sideNavFilters.includes("wine") ? (
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

          {window.sideNavFilters.includes("driving") ? (
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

          {window.sideNavFilters.includes("art") ? (
            <NavItem eventKey="art">
              <NavIcon>
                <img className="exp-nav-icon" src={art} alt="Art Expeiences" />
              </NavIcon>
              <NavText>Art</NavText>
            </NavItem>
          ) : (
            ""
          )}

          {window.sideNavFilters.includes("music") ? (
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

          {window.sideNavFilters.includes("outdoor") ? (
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

          {window.sideNavFilters.includes("sports") ? (
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
        <h1 className="exp-title">
          Customer Experience <span>Catalog</span>
        </h1>

        <div className="grid-x grid-margin-x grid-margin-y">
          {filtered.map((exp, i) => {
            return (
              <CSSTransition
                key={exp.id}
                in={exp.display}
                timeout={300}
                classNames="cardanim"
                unmountOnExit
              >
                <Card sort={i} experience={exp} />
              </CSSTransition>
            );
          })}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;

/*import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}*/

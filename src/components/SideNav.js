import React, { useContext } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { getIcon } from "./Icons";
import Context from "./Context";

const SideNavigation = ({ onToggle }) => {
  const [{ experiences }, dispatch] = useContext(Context);
  const sideNavFilters = experiences.reduce((types, experience) => {
    if (!types.includes(experience.Experience_Type__c.toLowerCase())) {
      types.push(experience.Experience_Type__c.toLowerCase());
    }
    return types;
  }, []);

  return (
    <SideNav
      onSelect={selected => {
        console.log("you selected", selected);
        dispatch({
          type: "EXP/filtered",
          payload: {
            selected
          }
        });
      }}
      onToggle={onToggle}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <img className="exp-nav-icon" src={getIcon("home")} alt="Home" />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>

        {sideNavFilters.includes("wine") ? (
          <NavItem eventKey="wine">
            <NavIcon>
              <img
                className="exp-nav-icon"
                src={getIcon("wine")}
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
                src={getIcon("cars")}
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
              <img
                className="exp-nav-icon"
                src={getIcon("art")}
                alt="Art Expeiences"
              />
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
                src={getIcon("music")}
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
                src={getIcon("outdoor")}
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
                src={getIcon("trophy")}
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
  );
};

export default SideNavigation;

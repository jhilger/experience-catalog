import React, { useContext } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "./sidenav.scss";
import { getIcon } from "../Icons";
import Context from "../Context";

const SideNavigation = ({ onToggle }) => {
  const [
    {
      experiences: {
        types: { data, list }
      }
    },
    dispatch
  ] = useContext(Context);

  const experienceTypes = list.map(experienceId => data[experienceId]);

  return (
    <SideNav
      onSelect={selected => {
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
        {experienceTypes.map(experienceType => (
          <NavItem
            key={experienceType.Id}
            eventKey={experienceType.Short_Name__c}
          >
            <NavIcon>
              <img
                className="exp-nav-icon"
                src={getIcon(experienceType.Short_Name__c.toLowerCase())}
                alt={experienceType.Alt_Text__c}
              />
            </NavIcon>
            <NavText>{experienceType.Short_Name__c}</NavText>
          </NavItem>
        ))}

        {/* TODO: (Isaac)  Loop through tiers to allow filtering by those tiers */}
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideNavigation;

import React, { useContext } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "./sidenav.scss";
import { getIcon } from "../Icons";
import Context from "../Context";

const SideNavigation = ({ onToggle }) => {
  const [
    {
      experiences: { types },
      experiences: { tiers }
    },
    dispatch
  ] = useContext(Context);

  const theme = "light";

  return (
    <SideNav
      className={theme}
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
            <img
              className="exp-nav-icon"
              src={getIcon("home", theme === "light" ? "gray" : "")}
              alt="Home"
            />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        {types.map(type => (
          <NavItem key={type.Id} eventKey={type.Short_Name__c}>
            <NavIcon>
              <img
                className="exp-nav-icon"
                src={getIcon(
                  type.Short_Name__c.toLowerCase(),
                  theme === "light" ? "gray" : ""
                )}
                alt={type.Alt_Text__c}
              />
            </NavIcon>
            <NavText>{type.Short_Name__c}</NavText>
          </NavItem>
        ))}

        {tiers.map(tier => (
          <NavItem key={tier.Id} eventKey={tier.Name}>
            <NavIcon>
              <img
                className="exp-nav-icon"
                src={getIcon(
                  tier.Name.toLowerCase(),
                  theme === "light" ? "gray" : ""
                )}
                alt={tier.Name}
              />
            </NavIcon>
            <NavText>{tier.Name}</NavText>
          </NavItem>
        ))}

        {/* TODO: (Isaac)  Loop through tiers to allow filtering by those tiers */}
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideNavigation;

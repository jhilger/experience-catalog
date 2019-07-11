import React from "react";
import { createGlobalStyle } from "styled-components";
import GlobalStyles from "./global";
import FontStyles from "./fonts";
import CardAnimationsStyles from "./cardanimations";
import CardStyles from "./card";
import SidenavStyles from "./sidenav";

const DynamicGlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.main.orange.lighten(0.6).hex()}
  }
`;

export default () => (
  <React.Fragment>
    <DynamicGlobalStyle />
    <GlobalStyles />
    <FontStyles />
    <CardAnimationsStyles />
    <SidenavStyles />
    <CardStyles />
  </React.Fragment>
);

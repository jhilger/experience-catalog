import React from "react";
import { createGlobalStyle } from "styled-components";
// import GlobalStyles from "./global";
// import FontStyles from "./fonts";
// import CardAnimationsStyles from "./cardanimations";
// import CardStyles from "./card";
// import SidenavStyles from "./sidenav";

const DynamicGlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.main.white.lighten(0.6).hex()}
  }
`;

const MainGlobalStyle = () => (
  <React.Fragment>
    <DynamicGlobalStyle />
    {/* <GlobalStyles />
    <FontStyles />
    <CardAnimationsStyles />
    <SidenavStyles />
    <CardStyles /> */}
  </React.Fragment>
);

export default MainGlobalStyle;

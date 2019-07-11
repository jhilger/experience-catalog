import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.main.blue.lighten(0.6).hex()}
  }
`;

export default GlobalStyle;

import styled from "styled-components";
import themed from "styled-theming";

const Color = require("color");

const primaryColor = themed.variants("mode", "variant", {
  default: {
    light: ({ theme }) => theme.main.gray.hex(),
    dark: ({ theme }) => theme.main.gray.darken(0.5).hex()
  },
  primary: {
    light: ({ theme }) => theme.main.blue.hex(),
    dark: ({ theme }) => theme.main.blue.darken(0.5).hex()
  },
  success: {
    light: ({ theme }) => theme.main.green.darken(0.2).hex(),
    dark: ({ theme }) => theme.main.green.darken(0.8).hex()
  },
  warning: {
    light: ({ theme }) => theme.main.orange.hex(),
    dark: ({ theme }) => theme.main.orange.darken(0.5).hex()
  },
  error: {
    light: ({ theme }) => theme.main.red.hex(),
    dark: ({ theme }) => theme.main.red.darken(0.5).hex()
  }
});

const Button = styled.button`
  background-color: ${primaryColor};
  color: ${props =>
    Color(primaryColor(props)).isDark() ? props.theme.main.white.hex() : props.theme.main.black.darken(0.8).hex()};
  padding: ${({ theme }) => `${theme.main.padding}px ${theme.main.padding * 2}px`};
  margin: ${({ theme }) => theme.main.padding}px;
  border-radius: ${({ theme }) => theme.main.padding}px !important;
`;

Button.Group = styled.div`
  & ${Button} {
    margin: 0;
    border-radius: 0 !important;
  }
  overflow: hidden;
  display: inline-block;
  margin: ${({ theme }) => theme.main.padding}px;
  border-radius: ${({ theme }) => theme.main.padding}px !important;
`;

Button.defaultProps = {
  variant: "default"
};

export default Button;

import styled from "styled-components";
import theme from "styled-theming";

const Color = require("color");

const primaryColor = theme.variants("mode", "variant", {
  default: {
    light: ({ theme }) => theme.colors.gray.hex(),
    dark: ({ theme }) => theme.colors.gray.darken(0.5).hex()
  },
  primary: { 
    light: ({ theme }) => theme.colors.blue.hex(),
    dark: ({ theme }) => theme.colors.blue.darken(0.5).hex()
   },
  success: {
    light: ({ theme }) => theme.colors.green.darken(0.2).hex(),
    dark: ({ theme }) => theme.colors.green.darken(0.8).hex()
  },
  warning: {
    light: ({ theme }) => theme.colors.orange.hex(),
    dark: ({ theme }) => theme.colors.orange.darken(0.5).hex()
  },
  error: {
    light: ({ theme }) => theme.colors.red.hex(),
    dark: ({ theme }) => theme.colors.red.darken(0.5).hex()
  }
});

const Button = styled.button`
  background-color: ${primaryColor};
  color: ${props => Color(primaryColor(props)).isDark()
      ? props.theme.colors.white.hex()
      : props.theme.colors.black.darken(0.8).hex()};
`;

Button.defaultProps = {
  variant: "default"
};

export default Button;

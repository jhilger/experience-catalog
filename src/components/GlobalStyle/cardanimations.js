import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  .cardanim-enter {
    transform: scale(0);
  }

  .cardanim-enter.cardanim-enter-active {
    transform: scale(1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .cardanim-exit {
    transform: scale(1);
  }

  .cardanim-exit.cardanim-exit-active {
    transform: scale(0);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`;

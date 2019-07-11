import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /*

gray -  #32373e  rgba(50,55,62,1)
gold light - ffd68b rgba(255,214,139,1)
gold med - ca992c rgba(202,153,44,1)
gold dark - 846528 rgba(132,101,40,1)


Proxima N W01 Light
Proxima N W01 Reg
Proxima N W01 Smbd
Proxima N W01 Xbold

*/
  /*  STOP TRANSITION ON PAGE LOAD  */
  .preload * {
    transition: none !important;
  }

  /*  GLOBAL STYLES */
  html {
    height: 100%;
    width: 100%;
    overflow: auto;
    scroll-behavior: smooth;
  }

  body {
    height: 100%;
    width: 100%;
    position: relative;
    line-height: 1.5;
    font-family: "Proxima N W01 Light", sans-serif;
    color: #32373e;
    background: #fff;
    scroll-behavior: smooth;
  }

  @media only screen and (max-width: 40em) {
    body {
      font-size: 0.7em;
    }
  }

  @media only screen and (min-width: 40.063em) {
    body {
      font-size: 0.82666666666667em;
    }
  }

  @media only screen and (min-width: 64.063em) {
    body {
      font-size: 1em;
    }
  }

  @media only screen and (min-width: 120.063em) {
    body {
      font-size: 1.25em;
    }
  }

  strong {
    font-family: "Proxima N W01 Bold", sans-serif;
  }

  a,
  a:focus,
  a:hover,
  button,
  button:focus,
  button:hover {
    outline: none;
    text-decoration: none;
    /*display:inline-block;
	font-family:'Proxima N W01 Smbd',sans-serif;
	text-transform: uppercase;
	line-height: 1;
	letter-spacing: 1px;
	transition:.5s;	
	vertical-align: middle;
	outline:none;
	text-decoration: none;*/
  }

  a:hover,
  button:hover {
    /*letter-spacing: 2px;*/
  }

  h1 {
    font-family: "Proxima N W01 Light", sans-serif;
    font-size: 2.125em;
    line-height: 1;
    letter-spacing: 0.063em;
    margin-bottom: 0.25em;
    text-transform: uppercase;
  }

  h1 span {
    font-family: "Proxima N W01 Smbd", sans-serif;
  }

  h2 {
    font-family: "Proxima N W01 Bold", sans-serif;
    line-height: 1;
    letter-spacing: 0.093em;
    margin-bottom: 0.425em;
    text-transform: uppercase;
    font-size: 1.425em;
  }

  h3 {
    font-family: "Proxima N W01 Bold", sans-serif;
    line-height: 1;
    letter-spacing: 0.03em;
    margin-bottom: 0;
    font-size: 2.125em;
  }

  h4 {
    font-family: "Proxima N W01 Bold", sans-serif;
    line-height: 1;
    letter-spacing: 0.093em;
    margin-bottom: 0.5em;
    font-size: 1.25em;
    text-transform: uppercase;
  }

  h5 {
    font-family: "Proxima N W01 Bold", sans-serif;
    line-height: 1;
    letter-spacing: 0.063em;
    margin-bottom: 1em;
    text-transform: uppercase;
  }

  p {
    line-height: 1.5;
    margin-bottom: 1em;
  }

  main {
    padding-left: 5rem;
    padding-right: 1rem;
  }

  main.expanded {
    padding-left: 16rem;
  }

  .exp-title {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }

  /******************************************************************************/
`;

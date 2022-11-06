import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  h1, h2, h3, p, span, div {
    font-family: 'Open Sans', sans-serif;
  }
  button {
    background: none;
    border: none;
    padding: 0;
  }

  html, body {
    height: 100%;
  }
  
  #root {
    height: 100%;
  }
`;

export default GlobalStyle;

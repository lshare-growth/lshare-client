import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
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

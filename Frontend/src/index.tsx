import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { RecoilRoot } from 'recoil';
import App from './App';
import GlobalStyle from './style/global';
import theme from './style/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <>
    <GlobalStyle />
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </>
);

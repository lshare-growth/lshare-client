import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import worker from './mocks/browser';
import App from './App';
import GlobalStyle from './style/global';
import theme from './style/theme';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

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

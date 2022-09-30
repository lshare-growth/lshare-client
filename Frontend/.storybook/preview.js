import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/style/global';
import theme from '../src/style/theme';
import { RecoilRoot } from 'recoil';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </RecoilRoot>
    </>
  ),
];

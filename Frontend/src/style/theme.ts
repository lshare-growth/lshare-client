import { css } from 'styled-components';

const colors = {
  title: '#212121',
  white: '#FFFFFF',
  titlePlaceholder: '#9F9F9F',
  box: '#AAAAAA',
  line: '#D9D9D9',
  circle: '#f7f7f7',
  placeholder: '#E5E5E5',
  modal: '#FAFBFC',
  footer: '#F0F1F4',
  tag: '#EFF3FA',
  background: '#FFFFFF',
  default: {
    initial: '#FFFFFF',
    hover: '#F7F7F7',
    border: '#D9D9D9',
    disabled: '#D9D9D9',
  },
  accent: {
    initial: '#3281F7',
    hover: '#2b71d9',
  },
  tiny: {
    initial: '#FFFFFF',
    hover: '#F7F7F7',
    border: '#FFFFFF',
    disabled: '#D9D9D9',
  },
  label: {
    default: '#EFF3FA',
    accent: '#3281F7',
    done: '#AAAAAA',
  },
  textButton: {
    default: '#9F9F9F',
    accent: '#3281F7',
  },
};

const mixins = {
  flexBox: ({ direction = 'row', justify = 'center', align = 'center' }) => css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
  `,
};

const theme = {
  colors,
  mixins,
};

export default theme;

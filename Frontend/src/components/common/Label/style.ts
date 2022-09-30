import styled, { css } from 'styled-components';

const mediumSize = css`
  width: 80px;
  height: 24px;
  line-height: 24px;
`;

const mediumUiStyle = css`
  border-radius: 2px;
`;

const mediumStyle = css`
  ${mediumSize};
  ${mediumUiStyle};
`;

const smallSize = css`
  height: 24px;
  line-height: 24px;
`;

const smallUiStyle = css`
  padding: 8px;
  border-radius: 2px;
`;

const smallStyle = css`
  ${smallSize};
  ${smallUiStyle};
`;

const labelStyles: any = {
  medium: mediumStyle,
  small: smallStyle,
};

const defaultStyle = css``;

const accentStyle = css`
  ${({ theme }) => theme.colors.background};
`;

const doneStyle = css`
  ${({ theme }) => theme.colors.background};
`;

const modeStyles: any = {
  default: defaultStyle,
  accent: accentStyle,
  done: doneStyle,
};

type labelProps = {
  mode: 'default' | 'accent' | 'done';
  size: 'medium' | 'small';
};

const StyledLabel = styled.span<labelProps>`
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  ${({ size }) => labelStyles[size]};
  color: ${({ mode }) => modeStyles[mode]};
  background-color: ${({ theme, mode }) => theme.colors.label[mode]};
`;

export default StyledLabel;

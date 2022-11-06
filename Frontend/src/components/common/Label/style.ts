import styled, { css } from 'styled-components';

const mediumSize = css`
  width: 80px;
  height: 24px;
  line-height: 24px;
`;

const mediumUiStyle = css`
  border-radius: 4px;
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
  padding: 8px 4px;
  border-radius: 4px;
`;

const xsmallUiStyle = css`
  border-radius: 4px;
`;

const smallStyle = css`
  ${smallSize};
  ${smallUiStyle};
`;

// TODO : 리팩토링, 크기는 small과 동일한것
const xsmallStyle = css`
  ${smallSize};
  ${xsmallUiStyle};
`;

const labelStyles: any = {
  medium: mediumStyle,
  small: smallStyle,
  xsmall: xsmallStyle,
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
  size: 'medium' | 'small' | 'xsmall';
};

const StyledLabel = styled.span<labelProps>`
  width: 48px;
  height: 30px;
  padding: 4px 6px;
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
  ${({ size }) => labelStyles[size]};
  color: ${({ mode }) => modeStyles[mode]};
  background-color: ${({ theme, mode }) => theme.colors.label[mode]};
`;

export default StyledLabel;

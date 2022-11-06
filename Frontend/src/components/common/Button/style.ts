import styled, { css } from 'styled-components';
import BasicButton from '@common/BasicButton';

const xLargeSize = css`
  width: 430px;
  height: 64px;
`;

const borderStyle = css`
  border-radius: 4px;
`;

const xLargeStyle = css`
  ${xLargeSize};
  ${borderStyle};
`;

const largeSize = css`
  width: 186px;
  height: 56px;
`;

const largeStyle = css`
  ${largeSize};
  ${borderStyle};
`;

const mediumSize = css`
  width: 144px;
  height: 50px;
`;

const mediumBorderStyle = css`
  border-radius: 4px;
`;

const mediumStyle = css`
  ${mediumSize};
  ${mediumBorderStyle};
`;

const smallSize = css`
  width: 78px; //84px;
  height: 40px;
`;

const xsmallSize = css`
  width: 64px;
  height: 32px;
  line-height: 16px;
`;

const smallBorderStyle = css`
  border-radius: 4px;
`;

const smallStyle = css`
  ${smallSize};
  ${smallBorderStyle};
`;

const xsmallBorderStyle = css`
  border-radius: 4px;
`;

const tinySize = css`
  width: 32px;
  height: 32px;
`;

const tinyBorderStyle = css`
  border-radius: 4px;
`;

/* padding: 8px; */
const xsmallStyle = css`
  ${xsmallSize};
  ${xsmallBorderStyle};
`;

const tinyStyle = css`
  ${tinySize};
  ${tinyBorderStyle};
`;

// TODO: any타입 구체화
const buttonStyles: any = {
  xlarge: xLargeStyle,
  large: largeStyle,
  medium: mediumStyle,
  small: smallStyle,
  xsmall: xsmallStyle,
  tiny: tinyStyle,
};

type buttonProps = {
  mode: string;
  size: string;
  disabled?: boolean;
};
const StyledButton = styled(BasicButton)<buttonProps>`
  ${({ size }) => buttonStyles[size]};
  color: ${({ theme, mode }) => mode === 'accent' && theme.colors.background};
  background-color: ${({ theme, mode }) => theme.colors[mode].initial};
  border: ${({ mode }) => (mode === 'default' ? '1px solid' : 'none')};
  border-color: ${({ theme, mode }) => theme.colors[mode].border};
  :hover:enabled {
    background-color: ${({ theme, mode }) => theme.colors[mode].hover};
    border-color: ${({ theme, mode }) => theme.colors[mode].hover};
  }
  :active:enabled {
    transform: scale(0.96);
  }
  :disabled {
    background-color: ${({ theme, mode }) => theme.colors[mode].disabled};
    opacity: 50%;
  }
  text-align: center;
`;

export default StyledButton;

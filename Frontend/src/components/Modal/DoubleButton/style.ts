import styled, { css } from 'styled-components';
import BasicButton from '@components/common/BasicButton';

const modalButtonStyle = css`
  width: 49.5%;
  padding: 16px 0;
  text-align: center;
`;

export const DividerContainer = styled.span`
  width: 1%;
`;

export const BetweenBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftBasicButton = styled(BasicButton)`
  ${modalButtonStyle}
`;

export const RightBasicButton = styled(BasicButton)`
  color: ${({ theme }) => theme.colors.accent.initial};
  ${modalButtonStyle};
`;

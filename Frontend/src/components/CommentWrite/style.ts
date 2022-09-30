import styled, { css } from 'styled-components';
import Avatar from '@common/Avatar';
import Button from '@common/Button';

const mediumSize = css`
  width: 930px;
  height: 50px;
`;

const smallSize = css`
  width: 810px;
  height: 46px;
`;

// TODO: any타입 구체화
const sizes: any = {
  medium: mediumSize,
  small: smallSize,
};

const margins: any = {
  medium: '64px',
  small: '58px',
};

export const Container = styled.div`
  display: flex;
`;

export const CustomAvatar = styled(Avatar)`
  margin: 0 16px 0 0;
  cursor: auto;
`;

export const ContentContainer = styled.div``;

export const ButtonContainer = styled.div<{ size: string }>`
  ${({ size }) => sizes[size]}
  margin: 8px 0 0 ${({ size }) => margins[size]};
  display: flex;
  justify-content: space-between;
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 16px;
`;

export const ErrorMsg = styled.h3`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent.initial};
`;

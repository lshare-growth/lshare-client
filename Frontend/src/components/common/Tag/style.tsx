import styled, { css } from 'styled-components';
import Button from '@components/common/Button';

export const CustomButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.tag};
  :hover {
    filter: brightness(90%);
  }
`;

const tagStyle = css`
  display: inline-block;
  align-items: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.tag};
  border-radius: 4px;
`;

export const Tag = styled.span`
  ${tagStyle}
`;

export const CustomTag = styled.span`
  ${tagStyle}
  cursor: pointer;
  :hover {
    filter: brightness(90%);
  }
`;

export const Container = styled.span`
  vertical-align: middle;
`;

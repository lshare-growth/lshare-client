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
  background-color: ${({ theme }) => theme.colors.tag};
  border-radius: 4px;
`;

export const Tag = styled.span`
  ${tagStyle}
  padding: 8px;
  cursor: pointer;
  :hover {
    filter: brightness(90%);
  }
`;

export const CustomTag = styled.span`
  ${tagStyle}
  padding: 4px 8px;
  cursor: pointer;
  :hover {
    filter: brightness(90%);
  }
`;

export const Container = styled.span`
  vertical-align: middle;
`;

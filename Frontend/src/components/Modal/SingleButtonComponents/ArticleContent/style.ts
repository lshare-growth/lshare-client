import styled from 'styled-components';

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  :not(:last-of-type) {
    margin: 0 0 32px 0;
  }
`;

export const Msg = styled.h3``;

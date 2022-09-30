import styled, { css } from 'styled-components';

const makeClosedStyle = (clamp: number) => {
  const closedStyle = css`
    display: -webkit-box;
    -webkit-line-clamp: ${clamp};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  return closedStyle;
};

export const Content = styled.div<{ isClosed: boolean; clamp: number }>`
  line-height: 160%;
  ${({ isClosed, clamp }) => isClosed && makeClosedStyle(clamp)}
`;

export const Container = styled.div``;

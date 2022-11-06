import styled, { css } from 'styled-components';

const MIN_CLAMP = 1;

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

const makeSingleClosedStyle = () => {
  const closedStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  return closedStyle;
};

export const Content = styled.div<{ isClosed: boolean; clamp: number }>`
  line-height: 160%;
  ${({ isClosed, clamp }) => isClosed && clamp > MIN_CLAMP && makeClosedStyle(clamp)}
  ${({ isClosed, clamp }) => isClosed && clamp === MIN_CLAMP && makeSingleClosedStyle()}
`;

export const Container = styled.div``;

export const SkeletonContent = styled.div`
  /* width: 320px;
  height: 30px; */
  /* width: 936px; */
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.default.border};
  border-radius: 4px;
`;

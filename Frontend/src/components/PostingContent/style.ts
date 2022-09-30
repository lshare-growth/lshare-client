import styled from 'styled-components';

export const Container = styled.span<{ clamp: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ clamp }) => clamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Content = styled.span`
  height: 88px;
  line-height: 160%;
`;

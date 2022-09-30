import styled from 'styled-components';

export const Wrapper = styled.div<{ itemGap: string; buttonSize: string }>`
  overflow: hidden;
`;

export const Container = styled.section<{ buttonSizeOnBothSide: string }>`
  position: relative;
  margin: 0 ${({ buttonSizeOnBothSide }) => buttonSizeOnBothSide};
`;

export const ChildrenItem = styled.div`
  background: ${({ theme }) => theme.colors.tag};
  text-align: center;
  font-size: 2rem;
  line-height: 140px;
  height: 150px;
  border-radius: 8px;
`;

export const StoryBookContainer = styled.div`
  margin-top: 50px;
`;

export const StoryBookItem = styled.div`
  background: ${({ theme }) => theme.colors.tag};
  text-align: center;
  font-size: 2rem;
  line-height: 140px;
  height: 150px;
  border-radius: 8px;
`;

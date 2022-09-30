import styled from 'styled-components';

export const ItemContainer = styled.ul<{
  showingSlideCardNum: number;
  slidingSize: number;
  itemGap: string;
}>`
  display: flex;
  width: calc(100% + ${({ itemGap }) => itemGap});
  transition: transform 1s linear 0s;
  transform: translateX(${({ slidingSize }) => slidingSize}%);
  margin-left: calc(-${({ itemGap }) => itemGap} / 2);
`;

export const Item = styled.li<{ showingSlideCardNum: number; itemGap: string }>`
  flex-shrink: 0;
  width: calc(${({ showingSlideCardNum }) => (1 / showingSlideCardNum) * 100}% - ${({ itemGap }) => itemGap});
  height: calc(${({ showingSlideCardNum }) => (1 / showingSlideCardNum) * 100}% - ${({ itemGap }) => itemGap});
  margin: 0 calc(${({ itemGap }) => itemGap} / 2);
`;

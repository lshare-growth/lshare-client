import styled from 'styled-components';

export const CalendarContainer = styled.div`
  display: 'flex';
  gap: '12px';
`;

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const ItemContainer = styled.ul<{
  canTransition: boolean;
  slideXCount: number;
  showingCardNum: number;
}>`
  display: flex;
  width: 100%;
  transition: ${({ canTransition }) =>
    canTransition && 'transform 0.5s linear 0s'};
  transform: ${({ slideXCount, showingCardNum }) =>
    `translateX(${-(100 / showingCardNum) * slideXCount}%)`};
`;

export const Item = styled.li<{
  itemGap: number;
  showingCardNum: number;
}>`
  flex-shrink: 0;
  width: ${({ itemGap, showingCardNum }) =>
    `calc(${100 / showingCardNum}% - ${itemGap}px)`};
  margin: 0 ${({ itemGap }) => itemGap / 2}px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 32px;
`;

export const Button = styled.button`
  cursor: pointer;
`;

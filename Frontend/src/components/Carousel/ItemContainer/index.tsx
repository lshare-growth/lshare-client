import { ReactElement, JSXElementConstructor, ReactFragment } from 'react';
import * as S from './style';

type ItemContainerProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>[] | ReactFragment[];
  showingSlideCardNum: number;
  slidingSize: number;
  handleTransitionEnd: () => void;
  itemGap: string;
};

const ItemContainer = ({ children, showingSlideCardNum, slidingSize, handleTransitionEnd, itemGap }: ItemContainerProps) => (
  <S.ItemContainer showingSlideCardNum={showingSlideCardNum} slidingSize={slidingSize} onTransitionEnd={handleTransitionEnd} itemGap={itemGap}>
    {children?.map((child, idx) => (
      <S.Item
        // eslint-disable-next-line react/no-array-index-key
        key={`cardContainer-${idx}`}
        showingSlideCardNum={showingSlideCardNum}
        itemGap={itemGap}
      >
        {child}
      </S.Item>
    ))}
  </S.ItemContainer>
);

export default ItemContainer;

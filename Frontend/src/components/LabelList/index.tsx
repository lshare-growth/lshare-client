import Item from '@components/LabelItem';
import { modeTypes, sizeTypes } from '@components/types/Label';
import itemType from '@components/types/LabelList';
import StyledContainer from './style';

type LabelListProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  mode: modeTypes;
  size: sizeTypes;
  items: itemType[];
};
const LabelList = ({ className, mode, size, items }: LabelListProps) => (
  <StyledContainer className={className}>
    {items.map((item) => (
      <Item
        key={`labelList-${item.id}-${item.content}`}
        item={item}
        mode={mode}
        size={size}
      />
    ))}
  </StyledContainer>
);

export default LabelList;

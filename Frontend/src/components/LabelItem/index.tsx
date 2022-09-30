import itemType from '@components/types/LabelList';
import Label from '@components/common/Label';
import { modeTypes, sizeTypes } from '@components/types/Label';
import StyledItem from './style';

type LabelItemProps = {
  item: itemType;
  mode: modeTypes;
  size: sizeTypes;
};

const LabelItem = ({ item: { content }, mode, size }: LabelItemProps) => (
  <StyledItem>
    <Label mode={mode} size={size}>
      {content}
    </Label>
  </StyledItem>
);
export default LabelItem;

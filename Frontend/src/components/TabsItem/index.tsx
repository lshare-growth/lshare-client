/* eslint-disable react/require-default-props */
import * as S from './style';

type TabsItemProps = {
  className?: string;
  id: number;
  content: string;
  selectedTabId?: number;
  // eslint-disable-next-line no-unused-vars
  handleClick: (selectedTabId: number) => void;
};

const TabsItem = ({ className, id, content, selectedTabId, handleClick }: TabsItemProps) => (
  <S.Item className={className} onClick={() => handleClick(id)}>
    <S.Tab isSelected={id === selectedTabId}>{content}</S.Tab>
  </S.Item>
);

export default TabsItem;

/* eslint-disable react/require-default-props */
import TabsItem from '@components/TabsItem';
import StyledContainer from './style';
import { tabsType } from './constants';

type TabsListProps = {
  className?: string;
  tabs: tabsType;
  selectedTabId?: number;
  // eslint-disable-next-line no-unused-vars
  handleClick: (selectedTabId: number) => void;
};
const TabsList = ({ className, tabs, selectedTabId, handleClick }: TabsListProps) => (
  <StyledContainer className={className}>
    {tabs.map(({ id, content }) => (
      <TabsItem key={`tabList-${id}`} id={id} selectedTabId={selectedTabId} content={content} handleClick={handleClick} />
    ))}
  </StyledContainer>
);
export default TabsList;

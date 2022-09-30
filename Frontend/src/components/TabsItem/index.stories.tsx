/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TabsItem from '.';
import tabs from './constants';

export default {
  title: 'Components/TabsItem',
  component: TabsItem,
} as ComponentMeta<typeof TabsItem>;

const selectedTabId = 1;
const unSelectedTabId = 2;
const handleClick = () => {};

const Template: ComponentStory<typeof TabsItem> = (args) => (
  <TabsItem {...args} />
);
export const SelectedTabsItem = Template.bind({});
SelectedTabsItem.args = {
  id: tabs[0].id,
  content: tabs[0].content,
  selectedTabId,
  handleClick,
};

export const unSelectedTabsItem = Template.bind({});
unSelectedTabsItem.args = {
  id: tabs[0].id,
  content: tabs[0].content,
  selectedTabId: unSelectedTabId,
  handleClick,
};

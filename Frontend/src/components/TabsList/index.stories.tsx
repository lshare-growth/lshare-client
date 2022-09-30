/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { tabs } from '@components/TabsList/constants';
import TabsList from '.';

export default {
  title: 'Components/TabsList',
  component: TabsList,
} as ComponentMeta<typeof TabsList>;

const Template: ComponentStory<typeof TabsList> = (args) => (
  <TabsList {...args} />
);

const selectedTabId = 1;
const handleClick = () => {};

export const DefaultTabsList = Template.bind({});
DefaultTabsList.args = {
  tabs,
  selectedTabId,
  handleClick,
};

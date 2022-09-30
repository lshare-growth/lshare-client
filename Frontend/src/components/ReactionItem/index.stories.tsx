/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ReactionItem from '.';

export default {
  title: 'Components/ReactionItem',
  component: ReactionItem,
} as ComponentMeta<typeof ReactionItem>;

const Template: ComponentStory<typeof ReactionItem> = (args) => (
  <ReactionItem {...args} />
);

export const DefaultReactionItem = Template.bind({});
DefaultReactionItem.args = {
  id: 1,
  content: '😀',
  count: 7,
  label: 'smile',
  isSelected: false,
};

export const SelectedReactionItem = Template.bind({});
SelectedReactionItem.args = {
  id: 1,
  content: '😀',
  count: 7,
  label: 'smile',
  isSelected: true,
};

/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import emojis from './constants';
import ReactionList from '.';

export default {
  title: 'Components/ReactionList',
  component: ReactionList,
} as ComponentMeta<typeof ReactionList>;

const Template: ComponentStory<typeof ReactionList> = (args) => <ReactionList {...args} />;

export const DefaultReactionList = Template.bind({});
DefaultReactionList.args = {
  emojis,
};

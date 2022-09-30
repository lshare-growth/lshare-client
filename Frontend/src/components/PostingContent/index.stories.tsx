/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PostingContent from '.';
import content from './constants';

export default {
  title: 'Components/PostingContent',
  component: PostingContent,
} as ComponentMeta<typeof PostingContent>;

const Template: ComponentStory<typeof PostingContent> = (args) => (
  <PostingContent {...args} />
);

export const DefaultPostingContent = Template.bind({});
DefaultPostingContent.args = {
  content,
  clamp: 9,
};

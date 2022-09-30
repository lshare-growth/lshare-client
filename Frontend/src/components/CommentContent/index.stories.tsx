/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommentContent from '.';
import { LONG_CONTENT, SHORT_CONTENT } from './constants';

export default {
  title: 'Components/CommentContent',
  component: CommentContent,
} as ComponentMeta<typeof CommentContent>;

const Template: ComponentStory<typeof CommentContent> = (args) => (
  <CommentContent {...args} />
);

export const LongCommentContent = Template.bind({});
LongCommentContent.args = {
  content: LONG_CONTENT,
};

export const ShortCommentContent = Template.bind({});
ShortCommentContent.args = {
  content: SHORT_CONTENT,
};

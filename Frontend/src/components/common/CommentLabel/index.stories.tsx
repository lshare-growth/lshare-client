/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommentLabel from '.';

export default {
  title: 'Components/CommentLabel',
  component: CommentLabel,
} as ComponentMeta<typeof CommentLabel>;

const Template: ComponentStory<typeof CommentLabel> = (args) => (
  <CommentLabel {...args} />
);

export const DefaultCommentLabel = Template.bind({});
DefaultCommentLabel.args = {
  isWriter: false,
  nickname: '이든',
};

export const WriterCommentLabel = Template.bind({});
WriterCommentLabel.args = {
  isWriter: true,
  nickname: 'Jun',
};

/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import info from '@components/CommentInfos/constants';
import CommentInfos from '.';

export default {
  title: 'Components/CommentInfos',
  component: CommentInfos,
} as ComponentMeta<typeof CommentInfos>;

const Template: ComponentStory<typeof CommentInfos> = (args) => (
  <CommentInfos {...args} />
);

const { avatorSrc, avatorAlt, nickname, time, isEdited } = info;
export const DefaultCommentInfos = Template.bind({});
DefaultCommentInfos.args = {
  avatorSrc,
  avatorAlt,
  nickname,
  time,
  isEdited,
};

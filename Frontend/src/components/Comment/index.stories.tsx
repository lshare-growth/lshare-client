/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import content from '@components/PostingContent/constants';
import emojis from '@components/ReactionList/constants';
import Comment from '.';

export default {
  title: 'Components/Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => (
  <Comment {...args} />
);

export const DefaultComment = Template.bind({});
DefaultComment.args = {
  replySize: 'medium',
  nickname: '이든',
  time: '10분',
  isEditied: true,
  replyNum: 5,
  commentId: 1,
  content,
  avatorSrc: '',
  avatorAlt: '',
  emojis,
  isAuthorized: true,
  writer: '이든',
};

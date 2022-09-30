/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommentTextArea from '.';

export default {
  title: 'Components/CommentTextArea',
  component: CommentTextArea,
} as ComponentMeta<typeof CommentTextArea>;

const Template: ComponentStory<typeof CommentTextArea> = (args) => <CommentTextArea {...args} />;

export const DefaultCommentTextArea = Template.bind({});
DefaultCommentTextArea.args = {
  id: 'comment',
  isAuthorized: true,
  size: 'medium',
};

export const UnAuthorizedComment = Template.bind({});
UnAuthorizedComment.args = {
  id: 'comment',
  isAuthorized: false,
  size: 'small',
};

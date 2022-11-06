/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommentWrite from '.';

export default {
  title: 'Components/CommentWrite',
  component: CommentWrite,
} as ComponentMeta<typeof CommentWrite>;

const Template: ComponentStory<typeof CommentWrite> = (args) => <CommentWrite {...args} />;

export const DefaultCommentWrite = Template.bind({});
DefaultCommentWrite.args = {
  id: 'commentWrite',
  isAuthorized: true,
  size: 'medium',
  placeholder: undefined,
};

export const SmallCommentWrite = Template.bind({});
SmallCommentWrite.args = {
  id: 'commentWrite',
  isAuthorized: false,
  size: 'small',
  placeholder: undefined,
};

/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommentManageMenu from '.';
import * as S from './style';

export default {
  title: 'Components/CommentManageMenu',
  component: CommentManageMenu,
} as ComponentMeta<typeof CommentManageMenu>;

const Template: ComponentStory<typeof CommentManageMenu> = (args) => (
  <S.StorybookContainer>
    <CommentManageMenu {...args} />
  </S.StorybookContainer>
);

export const DefaultCommentManageMenu = Template.bind({});
DefaultCommentManageMenu.args = {
  isCommentWriter: false,
};

export const WriterCommentManageMenu = Template.bind({});
WriterCommentManageMenu.args = {
  isCommentWriter: true,
};

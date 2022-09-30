/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextButton from '.';

export default {
  title: 'Components/TextButton',
  component: TextButton,
} as ComponentMeta<typeof TextButton>;

const Template: ComponentStory<typeof TextButton> = (args) => (
  <TextButton {...args} />
);

export const DefaultTextButton = Template.bind({});
DefaultTextButton.args = {
  mode: 'default',
  children: '자세히 보기',
};

export const DefaultAccentButton = Template.bind({});
DefaultAccentButton.args = {
  mode: 'accent',
  children: '프로필 사진 바꾸기',
};

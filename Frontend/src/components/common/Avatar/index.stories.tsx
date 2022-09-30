/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Avatar from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const SmallAvatar = Template.bind({});
SmallAvatar.args = {
  size: 'small',
};

export const XsmallAvatar = Template.bind({});
XsmallAvatar.args = {
  size: 'xsmall',
};

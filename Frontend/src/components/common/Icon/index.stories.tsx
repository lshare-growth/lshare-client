/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '.';

export default {
  title: 'Components/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const alertIcon: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const AlertIcon = alertIcon.bind({});
AlertIcon.args = {
  mode: 'alert',
  color: 'default',
};

export const AlertAccentIcon = alertIcon.bind({});
AlertAccentIcon.args = {
  mode: 'alert',
  color: 'accent',
};

export const AlertRandomIcon = alertIcon.bind({});
AlertRandomIcon.args = {
  mode: 'alert',
  color: '#C5EE3B',
};

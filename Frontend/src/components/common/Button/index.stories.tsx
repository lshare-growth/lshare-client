/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '.';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const XLargeAccentButton = Template.bind({});
XLargeAccentButton.args = {
  mode: 'accent',
  size: 'xlarge',
  children: 'BUTTON',
};

export const LargeAccentButton = Template.bind({});
LargeAccentButton.args = {
  mode: 'accent',
  size: 'large',
  children: 'BUTTON',
};

export const MediumButton = Template.bind({});
export const MediumAccentButton = Template.bind({});

MediumAccentButton.args = {
  mode: 'accent',
  size: 'medium',
  children: 'BUTTON',
};

export const SmallButton = Template.bind({});
export const SmallAccentButton = Template.bind({});
export const SmallDisabledButton = Template.bind({});
export const SmallDisabledAccentButton = Template.bind({});

SmallAccentButton.args = {
  mode: 'accent',
  size: 'small',
  children: 'BUTTON',
};

SmallDisabledAccentButton.args = {
  mode: 'accent',
  size: 'small',
  disabled: true,

  children: 'BUTTON',
};

/** default button */
MediumButton.args = {
  size: 'medium',
  children: 'BUTTON',
};

SmallButton.args = {
  size: 'small',
  children: 'BUTTON',
};

SmallDisabledButton.args = {
  size: 'small',
  disabled: true,
  children: 'BUTTON',
};

export const xsmallButton = Template.bind({});

xsmallButton.args = {
  size: 'xsmall',
  mode: 'tiny',
};

export const TinyButton = Template.bind({});

TinyButton.args = {
  size: 'tiny',
  mode: 'tiny',
};

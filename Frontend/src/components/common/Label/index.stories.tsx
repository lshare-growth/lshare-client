/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Label from '.';

export default {
  title: 'Components/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
  mode: 'default',
  size: 'small',
  children: '# 코테',
};

export const AccentLabel = Template.bind({});
AccentLabel.args = {
  mode: 'accent',
  size: 'medium',
  children: '모집중',
};

export const DoneLabel = Template.bind({});
DoneLabel.args = {
  mode: 'done',
  size: 'medium',
  children: '모집완료',
};
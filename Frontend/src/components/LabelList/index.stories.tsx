/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LabelList from '.';
import tags from './constants';

export default {
  title: 'Components/LabelList',
  component: LabelList,
} as ComponentMeta<typeof LabelList>;

const Template: ComponentStory<typeof LabelList> = (args) => (
  <LabelList {...args} />
);

export const DefaultLabelList = Template.bind({});
DefaultLabelList.args = {
  mode: 'default',
  size: 'small',
  items: tags,
};

export const AccentLabelList = Template.bind({});
AccentLabelList.args = {
  mode: 'accent',
  size: 'small',
  items: tags,
};

export const DoneLabelList = Template.bind({});
DoneLabelList.args = {
  mode: 'done',
  size: 'small',
  items: tags,
};

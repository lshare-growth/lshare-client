/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import tags from '@components/LabelList/constants';
import LabelItem from '.';

export default {
  title: 'Components/LabelItem',
  component: LabelItem,
} as ComponentMeta<typeof LabelItem>;

const Template: ComponentStory<typeof LabelItem> = (args) => (
  <LabelItem {...args} />
);

export const DefaultLabelItem = Template.bind({});
DefaultLabelItem.args = {
  mode: 'default',
  size: 'small',
  item: tags[0],
};

export const AccentLabelItem = Template.bind({});
AccentLabelItem.args = {
  mode: 'accent',
  size: 'small',
  item: tags[0],
};

export const DoneLabelItem = Template.bind({});
DoneLabelItem.args = {
  mode: 'done',
  size: 'small',
  item: tags[0],
};

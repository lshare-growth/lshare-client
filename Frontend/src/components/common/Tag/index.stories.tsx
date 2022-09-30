/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tag from '.';

export default {
  title: 'Components/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const tag: ComponentStory<typeof Tag> = (args) => (
  <Tag {...args}>typescript</Tag>
);

export const DefaultTag = tag.bind({});
export const CustomTag = tag.bind({});

DefaultTag.args = {
  mode: 'default',
};
CustomTag.args = {
  mode: 'custom',
};

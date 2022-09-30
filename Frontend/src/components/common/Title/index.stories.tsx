/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import title from '@components/common/Title/constants';
import Title from '.';

export default {
  title: 'Components/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => (
  <Title {...args}>typescript</Title>
);

export const DefaultTitle = Template.bind({});

DefaultTitle.args = {
  title,
};

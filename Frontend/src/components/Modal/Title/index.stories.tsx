/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DEFAULT_TITLE } from '@components/Modal/constants';
import Title from '.';

export default {
  title: 'Components/Modal/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  children: DEFAULT_TITLE,
};

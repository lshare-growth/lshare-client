/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DEFAULT_TITLE, DEFAULT_ARTICLE } from '@components/Modal/constants';
import DoubleButtonContent from '.';

export default {
  title: 'Components/Modal/DoubleButtonContent',
  component: DoubleButtonContent,
} as ComponentMeta<typeof DoubleButtonContent>;

const Template: ComponentStory<typeof DoubleButtonContent> = (args) => (
  <DoubleButtonContent {...args}>
    {DEFAULT_TITLE}
    {DEFAULT_ARTICLE}
  </DoubleButtonContent>
);

export const DefaultModal = Template.bind({});
DefaultModal.args = {};

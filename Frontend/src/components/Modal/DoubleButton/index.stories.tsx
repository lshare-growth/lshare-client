/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import DoubleButton from '.';

export default {
  title: 'Components/Modal/DoubleButton',
  component: DoubleButton,
} as ComponentMeta<typeof DoubleButton>;

const Template: ComponentStory<typeof DoubleButton> = (args) => (
  <DoubleButton {...args}>
    {BUTTON_CANCEL}
    {BUTTON_CONFIRM}
  </DoubleButton>
);

export const DefaultModal = Template.bind({});
DefaultModal.args = {};

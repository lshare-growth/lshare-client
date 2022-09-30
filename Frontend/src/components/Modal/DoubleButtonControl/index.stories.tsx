/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BUTTON_CANCEL, BUTTON_CONFIRM } from '@components/Modal/constants';
import DoubleButtonControl from '.';

export default {
  title: 'Components/Modal/DoubleButtonControl',
  component: DoubleButtonControl,
} as ComponentMeta<typeof DoubleButtonControl>;

const Template: ComponentStory<typeof DoubleButtonControl> = (args) => (
  <DoubleButtonControl {...args}>
    {BUTTON_CANCEL}
    {BUTTON_CONFIRM}
  </DoubleButtonControl>
);

export const DefaultModal = Template.bind({});
DefaultModal.args = {};

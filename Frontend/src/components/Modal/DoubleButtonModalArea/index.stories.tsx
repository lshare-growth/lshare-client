/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import DoubleButtonModal from '.';

export default {
  title: 'Components/Modal/DoubleButtonModal',
  component: DoubleButtonModal,
} as ComponentMeta<typeof DoubleButtonModal>;

const Template: ComponentStory<typeof DoubleButtonModal> = (args) => (
  <DoubleButtonModal {...args}>
    {BUTTON_CANCEL}
    {BUTTON_CONFIRM}
  </DoubleButtonModal>
);

export const DefaultModal = Template.bind({});
DefaultModal.args = {};

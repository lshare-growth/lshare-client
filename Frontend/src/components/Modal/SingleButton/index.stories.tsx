/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BUTTON_CONFIRM } from '@components/Modal/constants';

import SingleButton from '.';

export default {
  title: 'Components/Modal/SingleButton',
  component: SingleButton,
} as ComponentMeta<typeof SingleButton>;

const Template: ComponentStory<typeof SingleButton> = (args) => <SingleButton {...args} />;

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  children: <button type="button">{BUTTON_CONFIRM}</button>,
};

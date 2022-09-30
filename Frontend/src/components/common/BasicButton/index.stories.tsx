/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BasicButton from '.';

export default {
  title: 'Components/BasicButton',
  component: BasicButton,
} as ComponentMeta<typeof BasicButton>;

const Template: ComponentStory<typeof BasicButton> = (args) => <BasicButton {...args} />;

export const DefaultBasicButton = Template.bind({});
DefaultBasicButton.args = {
  children: 'BUTTON',
};

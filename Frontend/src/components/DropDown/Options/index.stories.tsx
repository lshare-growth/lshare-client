/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { options } from '../constants';
import Options from '.';

export default {
  title: 'Components/DropDown/Options',
  component: Options,
} as ComponentMeta<typeof Options>;

const Template: ComponentStory<typeof Options> = (args) => (
  <Options {...args} />
);

export const DefaultOptions = Template.bind({});
DefaultOptions.args = {
  options,
};

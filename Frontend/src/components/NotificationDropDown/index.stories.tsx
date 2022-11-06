/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Avator from '@common/Avatar';
import options from './constants';
import AvatorDropDown from '.';

export default {
  title: 'Components/AvatorDropDown/DropDown',
  component: AvatorDropDown,
} as ComponentMeta<typeof AvatorDropDown>;

const Template: ComponentStory<typeof AvatorDropDown> = (args) => (
  <AvatorDropDown {...args}>
    <Avator src="" alt="" />
    <div>컨텐츠!</div>
  </AvatorDropDown>
);

const handleSelect = () => {};

export const DefaultAvatorDropDown = Template.bind({});
DefaultAvatorDropDown.args = {
  handleSelect,
  options,
};

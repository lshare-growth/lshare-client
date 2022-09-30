/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropDown from '.';
import { dropDownSize, optionsWidth, selectTitles, options } from './constants';

export default {
  title: 'Components/DropDown',
  component: DropDown,
} as ComponentMeta<typeof DropDown>;

const dropDown: ComponentStory<typeof DropDown> = (args) => (
  <DropDown {...args} />
);

export const mediumDropDown = dropDown.bind({});
mediumDropDown.args = {
  width: dropDownSize.medium.width,
  height: dropDownSize.medium.height,
  optionsWidth,
  selectTitle: selectTitles[0],
  options,
};

export const smallDropDown = dropDown.bind({});
smallDropDown.args = {
  width: dropDownSize.small.width,
  height: dropDownSize.small.height,
  optionsWidth,
  selectTitle: selectTitles[0],
  options,
};

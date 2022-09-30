/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import options from '@components/AvatorDropDown/constants';
import Item from '.';

export default {
  title: 'Components/AvatorDropDown/Options/Item',
  component: Item,
} as ComponentMeta<typeof Item>;

const Template: ComponentStory<typeof Item> = (args) => <Item {...args} />;

const { option } = options[0];
export const DefaultItem = Template.bind({});
DefaultItem.args = {
  option,
};

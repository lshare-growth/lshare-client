/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Item from '.';
import { options } from '../../constants';

export default {
  title: 'Components/DropDown/Options/Item',
  component: Item,
} as ComponentMeta<typeof Item>;

const Template: ComponentStory<typeof Item> = (args) => <Item {...args} />;

const { content } = options[0];
export const DefaultItem = Template.bind({});
DefaultItem.args = {
  option: content,
};

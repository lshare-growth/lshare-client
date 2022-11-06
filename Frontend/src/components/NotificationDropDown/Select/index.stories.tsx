/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Avator from '@common/Avatar';
import Select from '.';

export default {
  title: 'Components/AvatorDropDown/DropDown/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const DefaultSelect = Template.bind({});
DefaultSelect.args = {
  children: <Avator src="" alt="" />,
};

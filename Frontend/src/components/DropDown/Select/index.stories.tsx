/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select from '.';
import { selectTitles } from '../constants';

export default {
  title: 'Components/DropDown/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const DefaultSelect = Template.bind({});
DefaultSelect.args = {
  selectTitle: selectTitles[0],
};

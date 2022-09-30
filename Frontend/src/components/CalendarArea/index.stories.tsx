/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CalendarArea from '.';

export default {
  title: 'Components/CalendarArea',
  component: CalendarArea,
} as ComponentMeta<typeof CalendarArea>;

const Template: ComponentStory<typeof CalendarArea> = (args) => (
  <CalendarArea {...args} />
);

const handleClickDate = () => {};
export const DefaultCalendarArea = Template.bind({});
DefaultCalendarArea.args = {
  handleClickDate,
};

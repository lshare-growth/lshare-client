/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchArea from '.';

export default {
  title: 'Components/SearchArea',
  component: SearchArea,
} as ComponentMeta<typeof SearchArea>;

const Template: ComponentStory<typeof SearchArea> = (args) => (
  <SearchArea {...args} />
);

export const DefaultSearchArea = Template.bind({});
DefaultSearchArea.args = {};

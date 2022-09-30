/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Search from '.';

export default {
  title: 'Components/Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const DefaultSearch = Template.bind({});
DefaultSearch.args = {
  size: 'large',
  id: 'studySearch',
};

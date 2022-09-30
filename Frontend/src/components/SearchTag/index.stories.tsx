/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchTag from '.';

export default {
  title: 'Components/SearchTag',
  component: SearchTag,
} as ComponentMeta<typeof SearchTag>;

const Template: ComponentStory<typeof SearchTag> = (args) => (
  <SearchTag {...args} />
);

export const DefaultSearchTag = Template.bind({});
DefaultSearchTag.args = {
  mode: 'default',
  id: 'studySearch',
};

export const CustomSearchTag = Template.bind({});
CustomSearchTag.args = {
  mode: 'tag',
  id: 'studySearch',
};

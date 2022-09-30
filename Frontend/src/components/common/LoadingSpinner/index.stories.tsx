/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoadingSpinner from '.';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = () => (
  <LoadingSpinner />
);

export const DefaultLoading = Template.bind({});
DefaultLoading.args = {};

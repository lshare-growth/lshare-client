/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Layout from '.';

export default {
  title: 'Components/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const DefaultLayout = Template.bind({});
DefaultLayout.args = {
  children: <h1>레이아웃</h1>,
};

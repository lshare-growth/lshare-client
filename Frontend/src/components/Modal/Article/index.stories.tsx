/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DEFAULT_ARTICLE } from '@components/Modal/constants';
import Article from '.';

export default {
  title: 'Components/Modal/Article',
  component: Article,
} as ComponentMeta<typeof Article>;

const Template: ComponentStory<typeof Article> = (args) => <Article {...args} />;

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  children: DEFAULT_ARTICLE,
};

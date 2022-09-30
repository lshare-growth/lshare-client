/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ALERT_CONTENT } from '@components/Modal/constants';
import Content from '.';

export default {
  title: 'Components/Modal/Content',
  component: Content,
} as ComponentMeta<typeof Content>;

const Template: ComponentStory<typeof Content> = (args) => <Content {...args} />;

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  size: 'medium',
  children: <span>{ALERT_CONTENT}</span>,
};

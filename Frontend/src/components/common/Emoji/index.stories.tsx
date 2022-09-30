/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Emoji from '.';

export default {
  title: 'Components/Emoji',
  component: Emoji,
} as ComponentMeta<typeof Emoji>;

const Template: ComponentStory<typeof Emoji> = (args) => <Emoji {...args} />;

export const DefaultEmoji = Template.bind({});
DefaultEmoji.args = {
  content: '😀',
  label: 'smile',
};

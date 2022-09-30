/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LikeCountBox from '.';

export default {
  title: 'Components/LikeCountBox',
  component: LikeCountBox,
} as ComponentMeta<typeof LikeCountBox>;

const Template: ComponentStory<typeof LikeCountBox> = (args) => (
  <LikeCountBox {...args} />
);

export const DefaultLikeCountBox = Template.bind({});
DefaultLikeCountBox.args = {
  count: 7,
};

/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Image from '.';

export default {
  title: 'Components/Image',
  component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const CircleImage = Template.bind({});
CircleImage.args = {
  mode: 'circle',
  size: 'small',
};

export const SquareImage = Template.bind({});
SquareImage.args = {
  mode: 'square',
  size: 'medium',
};

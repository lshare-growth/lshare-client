/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextArea from '.';

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const DefaultTextArea = Template.bind({});
DefaultTextArea.args = {
  id: 'textArea',
  size: 'medium',
};

export const SmallTextArea = Template.bind({});
SmallTextArea.args = {
  id: 'textArea',
  size: 'small',
};

export const LargeTextArea = Template.bind({});
LargeTextArea.args = {
  id: 'textArea',
  size: 'large',
};

/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '@common/Icon';
import IconCountBox from '.';

export default {
  title: 'Components/IconCountBox',
  component: IconCountBox,
} as ComponentMeta<typeof IconCountBox>;

const Template: ComponentStory<typeof IconCountBox> = (args) => (
  <IconCountBox {...args} />
);

export const DefaultIconCountBox = Template.bind({});
DefaultIconCountBox.args = {
  children: <Icon mode="views" />,
  count: 7,
};

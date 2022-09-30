/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Divider from '.';
import * as S from './style';

export default {
  title: 'Components/Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <S.StyoryBookContainer>
    <Divider {...args} />
  </S.StyoryBookContainer>
);
export const VerticalDivider = Template.bind({});
VerticalDivider.args = {
  direction: 'vertical',
};

export const HorizontalDivider = Template.bind({});
HorizontalDivider.args = {
  direction: 'horizontal',
};

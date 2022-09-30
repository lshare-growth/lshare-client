/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { items } from '@components/Carousel/constants';
import Carousel from '.';
import * as S from './style';

export default {
  title: 'Components/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <S.StoryBookContainer>
    <Carousel {...args} />
  </S.StoryBookContainer>
);
export const DefaultCarousel = Template.bind({});
DefaultCarousel.args = {
  children: items.map(({ id, content }) => <S.StoryBookItem key={`item-${id}`}>{content}</S.StoryBookItem>),
  showingSlideCardNum: 1,
};

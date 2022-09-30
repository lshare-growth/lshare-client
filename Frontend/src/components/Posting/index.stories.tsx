/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import title from '@common/Title/constants';
import tags from '@components/LabelList/constants';
import content from '@components/PostingContent/constants';
import { infos } from '@components/Posting/constants';
import Posting from '.';

export default {
  title: 'Components/Posting',
  component: Posting,
} as ComponentMeta<typeof Posting>;

const Template: ComponentStory<typeof Posting> = (args) => (
  <Posting {...args} />
);

export const DefaultPosting = Template.bind({});
DefaultPosting.args = {
  nickName: '이든',
  time: '10분전',
  title,
  infos,
  viewCount: 15,
  likeCount: 7,
  commentCount: 3,
  isRecruiting: true,
  content,
  tags,
};

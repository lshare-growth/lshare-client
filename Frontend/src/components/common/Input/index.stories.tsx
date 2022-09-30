/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '.';

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  label: '',
  placeholder: '스터디를 검색해보세요!',
  mode: 'default',
  size: 'small',
  id: 'studySearch',
};

export const TagInput = Template.bind({});
TagInput.args = {
  label: '태그',
  placeholder: '태그로 검색해보세요!',
  mode: 'tag',
  size: 'xlarge',
  id: 'a',
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  placeholder: '인증번호 입력하세요',
  mode: 'default',
  disabled: true,
  id: 'studySearch',
};

export const CalendarInput = Template.bind({});
CalendarInput.args = {
  placeholder: '2022-06-21',
  mode: 'calendar',
  id: 'studyCalendar',
  size: 'small',
};

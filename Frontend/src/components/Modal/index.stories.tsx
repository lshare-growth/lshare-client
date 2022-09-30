/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from '@components/Modal/Title';
import Article from '@components/Modal/Article';
import { SIGN_UP_TITLE, LOGIN_TITLE, DEFAULT_TITLE, DEFAULT_ARTICLE, BUTTON_CONFIRM, ALERT_CONTENT, BUTTON_CANCEL, LOGIN_BUTTON_CONTENT, SIGN_UP_BUTTON_CONTENT } from '@components/Modal/constants';
import Content from '@components/Modal/Content';
import SingleButton from '@components/Modal/SingleButton';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import SingleButtonModalArea from '@components/Modal/SingleButtonModalArea';
import ArticleContent from '@components/Modal/SingleButtonComponents/ArticleContent';
import ButtonContent from '@components/Modal/SingleButtonComponents/ButtonContent';
import { loginExplains, signUpExplains } from '@components/Modal/SingleButtonComponents/constants';
import Modal from '.';

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const handleClose = () => {};
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} onClose={handleClose} />;

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  children: (
    <>
      <Title>{DEFAULT_TITLE}</Title>
      <Article>{DEFAULT_ARTICLE}</Article>
      <SingleButton>
        <button type="button">{BUTTON_CONFIRM}</button>
      </SingleButton>
    </>
  ),
};

const handleClickSingleButton = () => {};
const handleClickCancelModal = () => {};
export const LoginModal = Template.bind({});
LoginModal.args = {
  children: (
    <Modal>
      <SingleButtonModalArea size="xlarge" handleClick={handleClickSingleButton} handleClickCancel={handleClickCancelModal}>
        {LOGIN_TITLE}
        <ArticleContent items={loginExplains} />
        <ButtonContent content={LOGIN_BUTTON_CONTENT} />
      </SingleButtonModalArea>
    </Modal>
  ),
};

export const SignUpModal = Template.bind({});
SignUpModal.args = {
  children: (
    <Modal>
      <SingleButtonModalArea size="large" handleClick={handleClickSingleButton} handleClickCancel={handleClickCancelModal}>
        {SIGN_UP_TITLE}
        <ArticleContent items={signUpExplains} />
        <ButtonContent content={SIGN_UP_BUTTON_CONTENT} />
      </SingleButtonModalArea>
    </Modal>
  ),
};

export const AlertModal = Template.bind({});
AlertModal.args = {
  children: (
    <Content size="small">
      <span>{ALERT_CONTENT}</span>
    </Content>
  ),
};

const handleClickCancel = () => {};
const handleClickConfirm = () => {};
export const DefaultDoubleButtonModalArea = Template.bind({});
DefaultDoubleButtonModalArea.args = {
  children: (
    <DoubleButtonModalArea handleClickLeftButton={handleClickCancel} handleClickRightButton={handleClickConfirm}>
      {DEFAULT_TITLE}
      <h3>{DEFAULT_ARTICLE}</h3>
      {BUTTON_CANCEL}
      {BUTTON_CONFIRM}
    </DoubleButtonModalArea>
  ),
};

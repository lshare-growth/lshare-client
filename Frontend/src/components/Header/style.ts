import styled, { css, keyframes } from 'styled-components';
import Logo from '@components/common/Logo';
import Button from '@components/common/Button';
import SearchTag from '@components/SearchTag';
import AvatorDropDown from '@components/AvatorDropDown';
import Divider from '@components/common/Divider';
import NotificationDropDown from '@components/NotificationDropDown';
import BasicButton from '@components/common/BasicButton';
import TabsList from '@components/TabsList';
import Pagination from '@components/Pagination';
import SearchArea from '@components/SearchArea';
import Input from '@common/Input';
import Icon from '@components/common/Icon';
import Modal from '@components/Modal';

export const CustomLogo = styled(Logo)``;

export const IconButton = styled(Button)`
  margin: 2px 0 0 8px;
`;

export const LoginButton = styled(Button)`
  margin: 0 0 0 8px;
  color: ${({ theme }) => theme.colors.title};
  font-size: 10px;
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
`;

export const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-around' })}
  z-index: 100;
`;

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-around' })}
  z-index: 101;
  position: absolute;
`;

export const CustomSearchTag = styled(SearchTag)`
  margin: 0 0 8px 406px;
`;

export const SearchTagContainer = styled.div`
  width: 528px;
  margin: 0 auto;
`;

export const FlexBetween = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Flex = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})}
`;

export const CustomAvatorDropDown = styled(AvatorDropDown)`
  margin: 0 0 0 8px;
`;

export const NotificationBar = styled.div`
  width: 472px;
  max-height: 264px;
  /* box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.line}; */
`;

export const NewNotification = styled.li<{ isRead: boolean }>`
  margin: 16px 8px;
  box-shadow: 0 3px 5px ${({ theme }) => theme.colors.line};
  border-radius: 4px;
  padding: 8px;
  display: flex;
  color: ${({ theme, isRead }) => (isRead ? theme.colors.default.disabled : theme.colors.title)};
  cursor: pointer;
`;

export const OldNotification = styled.li`
  color: ${({ theme }) => theme.colors.default.disabled};
  margin: 16px 8px;
  box-shadow: 0 3px 5px ${({ theme }) => theme.colors.line};
  border-radius: 4px;
  padding: 8px;
  width: 440px;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 8px 0;
`;

export const Info = styled.div`
  color: ${({ theme }) => theme.colors.default.disabled};
  margin: 0 8px 0 0;
`;

export const NotificationColumn = styled.div`
  /* box-shadow: 5px 5px 5px 5px ${({ theme }) => theme.colors.line}; */
  border-radius: 4px;
  margin: 8px;
`;

export const CustomNotificationDropDown = styled(NotificationDropDown)`
  margin: 0 0 0 8px;
`;

export const CustomBasicButton = styled(BasicButton)`
  margin: 0 8px;
`;

const makeClosedStyle = (clamp: number) => {
  const closedStyle = css`
    display: -webkit-box;
    -webkit-line-clamp: ${clamp};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  return closedStyle;
};

export const Content = styled.div<{ isClosed: boolean; clamp: number }>`
  line-height: 160%;
  ${({ isClosed, clamp }) => isClosed && makeClosedStyle(clamp)}
`;

export const CustomTabsList = styled(TabsList)`
  font-size: 16px;
  font-weight: 500;
`;

export const LoadingContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  margin: 16px 0;
`;

export const CustomPagination = styled(Pagination)`
  ${({ theme }) => theme.mixins.flexBox({})};
  margin: 16px 0;
`;

export const CustomSearchArea = styled(SearchArea)``;

export const CustomInput = styled(Input)`
  height: 32px;
`;

export const CustomIconBasicButton = styled(BasicButton)`
  margin: 0 0 0 8px;
`;

export const CustomIcon = styled(Icon)`
  margin: 2px 0 0 0;
`;

export const ProgressContainer = styled.div`
  /* position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1; */
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.accent.initial};
  border-radius: 0 0 4px 4px;
`;

const ChargingBar = keyframes`
0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
`;

export const ProgressBar = styled.div`
  /* position: absolute;
  top: 2px;
  left: 2px; */
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.modal};

  transform-origin: left;
  animation: ${ChargingBar} 2.5s 0s infinite forwards linear;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;

export const CustomModal = styled(Modal)`
  z-index: 300;
  margin: 4px 0 0 0;
`;

export const EmptyMsg = styled.span`
  margin: 8px 0;
`;

export const FlexBox = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
`;

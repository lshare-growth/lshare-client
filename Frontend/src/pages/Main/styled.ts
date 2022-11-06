import styled, { keyframes } from 'styled-components';
import TabsList from '@components/TabsList';
import { Link } from 'react-router-dom';
import Divider from '@components/common/Divider';
import Pagination from '@components/Pagination';
import SearchTag from '@components/SearchTag';
import Button from '@components/common/Button';

export const Container = styled.div`
  width: 720px;
  margin: 0 auto;
`;

export const CustomProgressTabsContainer = styled.div`
  height: 16px;
  margin: 32px 0 0 0;
`;

export const CustomProgressTabs = styled(TabsList)`
  float: right;
`;

export const CustomTabs = styled(TabsList)`
  align-items: center;
`;

export const Category = styled.h3`
  font-size: 20px;
`;

export const PostingContainer = styled.ul``;

export const PostingItem = styled.li`
  list-style: none;
`;

export const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 8px 0;
`;

export const FlexBetween = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
  margin: 40px 16px 16px 16px;
`;

export const CustomPagination = styled(Pagination)`
  ${({ theme }) => theme.mixins.flexBox({})};
  margin: 16px 0;
`;

export const FlexBox = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
`;

export const EmptyMsg = styled.span`
  margin: 8px 0;
`;

export const SearchTagContainer = styled.div`
  width: 528px;
  margin: 0 auto;
`;

export const CustomSearchTag = styled(SearchTag)`
  margin: 64px 0 0 0;
`;

export const CustomButton = styled(Button)`
  font-size: 10px;
  margin: 0 0 0 8px;
`;

export const CustomPostingButton = styled(Button)`
  font-size: 10px;
  margin: 0 0 0 8px;
  /* color: ${({ theme }) => theme.colors.white}; */
  background-color: ${({ theme }) => theme.colors.skeleton};
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
  right: 0;
`;

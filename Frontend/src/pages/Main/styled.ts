import styled from 'styled-components';
import TabsList from '@components/TabsList';
import { Link } from 'react-router-dom';
import Divider from '@components/common/Divider';

export const Container = styled.div`
  width: 928px;
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

export const PostingContainer = styled.ul``;

export const PostingItem = styled.li``;

export const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 8px 0;
`;

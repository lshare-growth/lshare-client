import styled from 'styled-components';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 1144px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 32px 0 18px 0;
`;

export const ItemContainer = styled.ul``;

export const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 16px;
`;

export const CustomLink = styled(Link)`
  width: 1000px;
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HorizontalDivider = styled(Divider)`
  width: 1100px;
  margin: 0 auto;
`;

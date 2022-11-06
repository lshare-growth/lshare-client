import styled from 'styled-components';
import BasicButton from '@components/common/BasicButton';
import Icon from '@common/Icon';

export const CustomIcon = styled(Icon)<{ disabled?: boolean }>`
  color: inherit;
`;

export const Button = styled(BasicButton)`
  margin: 0 8px 0 0;
`;

export const Containter = styled.div`
  display: flex;
`;

export const ItemContainer = styled.ul`
  display: flex;
`;

export const Item = styled.li`
  list-style: none;
`;

export const PageButton = styled.button<{ isSelected: boolean }>`
  width: 32px;
  height: 32px;
  line-height: 32px;
  margin: 0 8px 0 0;
  text-align: center;
  vertical-align: middle;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 8px;
  color: ${({ isSelected, theme }) => isSelected && theme.colors.white};
  background-color: ${({ isSelected, theme }) => isSelected && theme.colors.accent.initial};
  :enabled {
    cursor: pointer;
  }
`;

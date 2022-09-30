import styled from 'styled-components';
import Select from './Select';

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

export const SelectContainer = styled.div<{
  width: string;
  height: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export const CustomSelect = styled(Select)`
  border-radius: 4px;
`;

export const Content = styled.div<{
  width?: string;
  isStartFromRight?: boolean;
  isClicked: boolean;
}>`
  display: ${({ isClicked }) => (isClicked ? 'block' : 'none')};
  position: absolute;
  width: ${({ width }) => width};
  box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.line};
  border-radius: 4px;
  right: ${({ isStartFromRight }) => isStartFromRight && '0'};
  background-color: ${({ theme }) => theme.colors.default.initial};
  z-index: 1;
`;

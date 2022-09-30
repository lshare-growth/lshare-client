import styled from 'styled-components';
import TextArea from '@components/TextArea';

export const Label = styled.label``;

export const CustomTextArea = styled(TextArea)<{ isAuthorized?: boolean }>`
  border-radius: 4px;
  ::placeholder {
    color: ${({ isAuthorized, theme }) =>
      !isAuthorized && theme.colors.accent.initial};
  }
`;

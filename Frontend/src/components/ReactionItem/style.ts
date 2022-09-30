import styled from 'styled-components';
import Emoji from '@common/Emoji';
import Button from '@components/common/Button';

export const Item = styled.li`
  margin: 0 8px 0 0;
`;

export const CustomEmoji = styled(Emoji)`
  margin: 0 8px 0 0;
`;

export const CustomButton = styled(Button)<{ isSelected: boolean }>`
  margin: 0 8px 0 0;
  filter: ${({ isSelected }) => isSelected && 'brightness(90%)'};
`;

export const Count = styled.span``;

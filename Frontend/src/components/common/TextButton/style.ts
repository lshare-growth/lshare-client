import styled from 'styled-components';
import BasicButton from '@components/common/BasicButton';

const StyledButton = styled(BasicButton)<{ mode: 'default' | 'accent' }>`
  color: ${({ theme, mode }) => theme.colors.textButton[mode]};
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export default StyledButton;

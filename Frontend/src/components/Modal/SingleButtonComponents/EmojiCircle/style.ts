import styled from 'styled-components';

const StyledEmojiCircle = styled.span`
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.circle};
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export default StyledEmojiCircle;

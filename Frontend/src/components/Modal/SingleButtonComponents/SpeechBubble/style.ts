import styled from 'styled-components';

const StyledRoundedRectangle = styled.div`
  background-color: ${({ theme }) => theme.colors.tag};
  border-radius: 16px;
  padding: 8px;
  margin: 0 0 0 16px;
`;

export default StyledRoundedRectangle;

import styled from 'styled-components';

const StyledContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})}
`;

export default StyledContainer;

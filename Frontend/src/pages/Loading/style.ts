import styled from 'styled-components';

const StyledContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  height: 100vh;
  vertical-align: 'middle';
`;

export default StyledContainer;

import styled from 'styled-components';

const StyledContainer = styled.ul`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'stretch', align: 'center' })}
`;

export default StyledContainer;

import styled from 'styled-components';

const StyledLabel = styled.span<{ isStudyOrganizer: boolean; isMyComment: boolean }>`
  height: 16px;
  padding: 4px;
  border-radius: 4px;
  font-weight: 550;
  cursor: pointer;
`;

export default StyledLabel;

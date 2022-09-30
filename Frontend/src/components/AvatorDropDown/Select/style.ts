import styled from 'styled-components';

export const DropDown = styled.input`
  visibility: hidden;
  position: absolute;
`;

export const SelectTitle = styled.span`
  width: 100%;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
`;

export const Select = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;

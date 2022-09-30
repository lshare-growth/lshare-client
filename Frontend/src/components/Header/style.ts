import styled from 'styled-components';
import Logo from '@components/common/Logo';
import Button from '@components/common/Button';
import SearchTag from '@components/SearchTag';

export const CustomLogo = styled(Logo)``;

export const IconButton = styled(Button)`
  margin: 2px 0 0 8px;
`;

export const LoginButton = styled(Button)`
  margin: 0 0 0 8px;
  color: ${({ theme }) => theme.colors.title};
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 8px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-around' })}
  z-index: 100;
`;

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-around' })}
  z-index: 101;
  position: absolute;
`;

export const CustomSearchTag = styled(SearchTag)`
  margin: 0 0 8px 406px;
`;

export const SearchTagcontainer = styled.div`
  width: 528px;
  margin: 0 auto;
`;

export const SearchTagContainer = styled.div`
  width: 528px;
  margin: 0 auto;
`;

export const FlexBetween = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Flex = styled.div`
  display: flex;
`;

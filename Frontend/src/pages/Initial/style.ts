import styled from 'styled-components';

import Title from '@components/common/Title';
import PostingContent from '@components/PostingContent';
import Image from '@components/common/Image';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';
import Label from '@components/common/Label';
import Divider from '@components/common/Divider';

const widthSize = '320px';
const itemPadding = 8;
const itemPaddingSize = '16px';
const marginSize = '16px';
const itemNum = 3;
export const CustomTitle = styled(Title)`
  width: ${widthSize};
`;

export const CustomPostingContent = styled(PostingContent)`
  width: ${widthSize};
`;

export const Panel = styled.span`
  color: ${({ theme }) => theme.colors.accent.initial};
`;

export const CustomImage = styled(Image)`
  margin: 0 8px 8px 0;
`;

export const Item = styled.li`
  width: ${widthSize};
  margin: 0 ${marginSize} ${marginSize} 0;
  padding: ${itemPaddingSize};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  :hover {
    filter: brightness(90%);
  }
`;

export const CarouselContainer = styled.div`
  padding: 0 16px;
  margin: 0 0 32px 0;
`;

export const CarouselItem = styled.div`
  background: ${({ theme }) => theme.colors.tag};
  text-align: center;
  font-size: 2rem;
  line-height: 140px;
  height: 150px;
  border-radius: 8px;
`;

export const MoreButtonContainer = styled.div`
  margin: 0 0 32px 0;
  ${({ theme }) => theme.mixins.flexBox({})}
`;
// calc(widthSize + marginSize + itemPaddingSize * ${itemNum});
export const MoreButton = styled(Button)``;
// width: 1056px;
export const Container = styled.div`
  width: calc((${widthSize} + ${marginSize} + ${itemPaddingSize} * 2) * ${itemNum});
  margin: 0 auto;
`;

export const ItemsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0 0 0;
`;

export const Content = styled.div`
  margin: 16px 0 0 0;
  display: flex;
`;

export const ReactionsContainer = styled.div`
  /* width: 240px; */
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;

export const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const CustomLabel = styled(Label)``;

export const HorizontalDivider = styled(Divider)`
  margin: 8px 0;
`;

export const TagContainer = styled.ul`
  display: flex;
  width: calc(${widthSize} - ${itemPaddingSize});
  margin: 8px 0;
`;

export const TagItem = styled.li`
  color: ${({ theme }) => theme.colors.titlePlaceholder};
  margin: 0 8px 0 0;
  padding: 0 ${itemPaddingSize} 0 0;
  white-space: nowrap;
`;

export const TitleLabel = styled.span``;

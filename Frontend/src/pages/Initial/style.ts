import styled from 'styled-components';

import Title from '@components/common/Title';
import PostingContent from '@components/PostingContent';
import Image from '@components/common/Image';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';
import Label from '@components/common/Label';
import Divider from '@components/common/Divider';
import IconCountBox from '@components/IconCountBox';
import CommentContent from '@components/CommentContent';
import LabelList from '@components/LabelList';

const widthSize = '232px';
const itemPaddingSize = '16px';
const marginSize = '16px';
const itemNum = 3;
export const CustomTitle = styled(Title)`
  width: ${widthSize};
`;

export const CustomPostingContent = styled(PostingContent)`
  width: ${widthSize};
  font-size: 14px;
`;

export const Panel = styled.span`
  color: ${({ theme }) => theme.colors.accent.initial};
`;

export const CustomImage = styled(Image)`
  margin: 0 8px 8px 0;
`;

export const Item = styled.li`
  width: ${widthSize};
  margin: calc(${marginSize} / 2) calc(${marginSize} / 2);
  padding: ${itemPaddingSize};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  :hover {
    filter: brightness(96%);
  }
`;

export const CarouselContainer = styled.div`
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

export const MoreButton = styled(Button)``;

export const Container = styled.div`
  width: calc((${widthSize} + ${marginSize} + ${itemPaddingSize} * 2) * ${itemNum});
  margin: 0 auto;
`;

export const ItemsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  margin: 0 auto;
`;

export const Content = styled.div`
  margin: 16px 0 0 0;
  display: flex;
`;

export const ReactionsContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;

export const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  :hover {
    filter: brightness(96%);
  }
`;

export const CustomLabel = styled(Label)`
  font-size: 10px;
`;

export const TitleHorizontalDivider = styled(Divider)`
  margin: 24px 0;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 16px 0;
`;

export const TagContainer = styled.ul`
  display: flex;
  width: calc(${widthSize} - ${itemPaddingSize});
  margin: 8px 0;
  flex-wrap: wrap;
`;

export const TagItem = styled.li`
  color: ${({ theme }) => theme.colors.titlePlaceholder};
  margin: 4px 4px 4px 0;
  padding: 0 ${itemPaddingSize} 0 0;
  white-space: nowrap;
  font-size: 12px;
`;

export const TitleLabel = styled.span`
  font-size: 20px;
  font-weight: 400;
`;

export const SkeletonTitle = styled.div`
  height: 32px;
  background-color: ${({ theme }) => theme.colors.default.border};
  margin: 16px 0;
  border-radius: 4px;
`;

export const SkeletonContent = styled.div`
  height: 56px;
  background-color: ${({ theme }) => theme.colors.default.border};
  border-radius: 4px;
`;

export const SkeletonTag = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.default.border};
  margin: 0 16px 0 0;
`;

export const SkeletonButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.default.border};
  border-radius: 4px;
`;

export const SkeletonItem = styled.li`
  list-style: none;
  margin: 0 32px 0 0;
`;

export const SkeletonLabel = styled.div`
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const SkeletonContainer = styled.ul`
  display: flex;
  align-items: center;
  margin: 32px 0 16px 0;
`;

export const SkeletonAvator = styled.div`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const SkeletonFlex = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'start', align: 'center' })}
  margin: 16px 0;
`;

export const SkeletonPosting = styled.div`
  margin: 16px 0;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.skeleton};
  border-radius: 4px;
`;

export const SkeletonReactionsContainer = styled.ul`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;

export const SkeletonLabelItem = styled.li`
  width: 33%;
  :not(:last-of-type) {
    margin: 0 16px 0 0;
  }
`;

export const SkeletonItemsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0 0 0;
  background-color: ${({ theme }) => theme.colors.skeleton};
`;

export const SkeletonLandingPostingItem = styled.li`
  width: ${widthSize};
  margin: 0 ${marginSize} ${marginSize} 0;
  padding: ${itemPaddingSize};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.skeleton};
`;

export const CustomIconCountBox = styled(IconCountBox)`
  margin: 0 0 0 12px;
`;

export const StudyOrgainzer = styled(CommentContent)`
  font-size: 13px;
  text-align: right;
  color: ${({ theme }) => theme.colors.subTitle};
  font-weight: 800;
`;

export const ImgItem = styled.img``;

export const CustomLabelList = styled(LabelList)`
  margin: 12px 0 0 0;
`;

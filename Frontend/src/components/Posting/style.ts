import styled from 'styled-components';
import Label from '@common/Label';
import Title from '@common/Title';
import LabelList from '@components/LabelList';
import PostingContent from '@components/PostingContent';

export const PostingContainer = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  :hover {
    filter: brightness(96%);
  }
`;

export const CustomLabel = styled(Label)`
  margin: 0 16px 0 0;
  color: ${({ theme }) => theme.colors.background};
`;

export const RecruitingLabel = styled(Label)``;

export const CustomPostingContent = styled(PostingContent)`
  margin: 16px 0;
  font-size: 13.5px;
`;

export const IconItem = styled.li`
  margin: 0 0 0 12px;
`;

export const TagItems = styled(LabelList)`
  margin: 16px 0 0 0;
`;

export const NickName = styled.h3`
  margin: 0 8px 0 0;
  color: ${({ theme }) => theme.colors.titlePlaceholder};
`;

export const CustomTitle = styled(Title)`
  font-weight: 600;
  max-width: 470px;
`;

export const IconContainer = styled.ul`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
`;

export const CenterContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
`;

export const TitleContainer = styled.div`
  display: flex;
  margin: 16px 0 0 0;
`;

export const SubTitleContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between', align: 'stretch' })}
`;

export const InfoContainer = styled.div`
  margin: 32px 0 0 0;
  display: flex;
`;

export const Time = styled.h3`
  color: ${({ theme }) => theme.colors.titlePlaceholder};
`;

export const InfoItem = styled.li`
  margin: 0 8px 0 0;
  color: ${({ theme }) => theme.colors.titlePlaceholder};
`;

export const SkeletonTitle = styled.div`
  /* width: 320px; */
  /* width: 720px; */
  height: 32px;
  background-color: ${({ theme }) => theme.colors.default.border};
  margin: 16px 0;
  border-radius: 4px;
`;

export const SkeletonContent = styled.div`
  /* width: 320px;
  height: 30px; */
  /* width: 968px; */
  height: 56px;
  margin: 0 0 16px 0;
  background-color: ${({ theme }) => theme.colors.default.border};
  border-radius: 4px;
`;

export const SkeletonTag = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.default.border};
  margin: 0 16px 0 0;
`;

export const SkeletonItem = styled.li`
  list-style: none;
  margin: 0 32px 0 0;
`;

export const SkeletonLabel = styled.div`
  /* width: 100%; //96px; */
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
  /* width: 240px; */
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;

export const SkeletonLabelItem = styled.li`
  width: 50%;
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

//
export const SkeletonLabelContainer = styled.ul`
  width: 146px;
  ${({ theme }) => theme.mixins.flexBox({})}
`;

export const FlexBetween = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;
export const SkeletonInfos = styled.div`
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const SkeletonInfosItem = styled.li`
  width: 100%;
  /* margin: 0 0 0 16px; */
`;

export const SkeletonInfosContainer = styled.ul`
  width: 170px;
  ${({ theme }) => theme.mixins.flexBox({})}
`;

export const SkeletonPostingContainer = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.skeleton};
`;

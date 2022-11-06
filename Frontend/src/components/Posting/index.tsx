/* eslint-disable react/require-default-props */
import IconCountBox from '@components/IconCountBox';
import Icon from '@common/Icon';
import LabeList from '@components/LabelList';
import { DEFAULT_CLAMP } from '@components/Posting/constants';
import * as S from './style';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { LANDING_PATH, SERVER_ERROR_PATH } from '../../constants/route';

type keyType = 'id' | 'content';
type infosType = Record<keyType, any>;

type PostingProps = {
  nickName: string;
  time: string;
  title: string;
  infos: infosType[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isRecruiting: boolean;
  content: string;
  tags: infosType[];
  className?: string;
  clamp?: number;
  isLoading?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClick?: () => void;
};

// const handleClickDone = () => {
//   const postDone = async () => {
//     const token = localStorage.getItem('accessToken');
//     const refreshToken = cookies.get(`SEC_EKIL15`);
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       RefreshToken: `Bearer ${refreshToken}`,
//       'Content-Type': 'application/json',
//     };
//     try {
//       const data = {
//         studyStatus: newEmoji,
//       };
//       console.log(data);
//       const navigate = useNavigate();
//       const response = await axios.post(`${process.env.END_POINT}api/studies/${id}/study-status`, data, { headers });
//       console.log(response);
//       if (response.status === 404) {
//         navigate(`${LANDING_PATH}`);
//         return;
//       }
//       if (response.status === 500) {
//         navigate(`${SERVER_ERROR_PATH}`);
//       }
//     } catch (error: any) {
//       console.log(error);
//     }
//   };
// };

const ITEM_NUM = 2;
const INFOS_NUM = 1;
const skeletonItems = Array.from({ length: ITEM_NUM }, (_, index) => index + 1);
const skeletonItemsInfos = Array.from({ length: INFOS_NUM }, (_, index) => index + 1);

// eslint-disable-next-line no-unused-vars
const Posting = ({ isLoading, nickName, time, title, infos, viewCount, likeCount, commentCount, isRecruiting, content, tags, clamp = DEFAULT_CLAMP, className, handleClick }: PostingProps) =>
  isLoading ? (
    <S.SkeletonPostingContainer>
      <S.FlexBetween>
        <S.SkeletonLabelContainer>
          {skeletonItems.map((skeletonItemIndex) => (
            <S.SkeletonLabelItem key={`Initial-skeleton-${skeletonItemIndex}`}>
              <S.SkeletonLabel />
            </S.SkeletonLabelItem>
          ))}
        </S.SkeletonLabelContainer>
        <S.SkeletonInfosContainer>
          {skeletonItemsInfos.map((skeletonItemIndex) => (
            <S.SkeletonInfosItem key={`Initial-skeleton-${skeletonItemIndex}`}>
              <S.SkeletonLabel />
            </S.SkeletonInfosItem>
          ))}
        </S.SkeletonInfosContainer>
      </S.FlexBetween>
      <S.SkeletonTitle />
      <S.SkeletonContent />
      <S.SkeletonLabelContainer>
        {skeletonItems.map((skeletonItemIndex) => (
          <S.SkeletonLabelItem key={`Initial-skeleton-${skeletonItemIndex}`}>
            <S.SkeletonLabel />
          </S.SkeletonLabelItem>
        ))}
      </S.SkeletonLabelContainer>
    </S.SkeletonPostingContainer>
  ) : (
    <S.PostingContainer className={className}>
      <S.SubTitleContainer>
        <S.CenterContainer>
          {isRecruiting ? (
            <S.CustomLabel mode="accent" size="small">
              모집중
            </S.CustomLabel>
          ) : (
            <S.CustomLabel mode="done" size="small">
              모집완료
            </S.CustomLabel>
          )}
          <S.CustomTitle title={title} />
          {/* <ul style={{ display: 'flex' }}>
            {infos.map((info) => (
              <S.InfoItem key={`posting-${info.id}`} style={{ margin: '0 8px 0 0' }}>
                {info.content}
              </S.InfoItem>
            ))}
          </ul> */}
        </S.CenterContainer>
        <S.IconContainer>
          <S.IconItem key="icon-view">
            <IconCountBox count={viewCount}>
              <Icon mode="views" color="subTitle" />
            </IconCountBox>
          </S.IconItem>
          <S.IconItem key="icon-like">
            <IconCountBox count={likeCount}>
              <Icon mode="thumbsUp" color="subTitle" />
            </IconCountBox>
          </S.IconItem>
          <S.IconItem key="icon-comment">
            <IconCountBox count={commentCount}>
              <Icon mode="comment" color="subTitle" />
            </IconCountBox>
          </S.IconItem>
        </S.IconContainer>
      </S.SubTitleContainer>
      {/* <S.TitleContainer>
        <S.CustomTitle title={title} />
      </S.TitleContainer> */}
      <S.CustomPostingContent content={content} clamp={clamp} />
      <LabeList mode="default" size="small" items={tags} />
      <S.InfoContainer>
        <S.NickName>{nickName}</S.NickName>
        <S.Time>{time}</S.Time>
      </S.InfoContainer>
    </S.PostingContainer>
  );

export default Posting;

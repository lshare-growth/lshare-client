/* eslint-disable react/require-default-props */
import IconCountBox from '@components/IconCountBox';
import Icon from '@common/Icon';
import LabeList from '@components/LabelList';
import { DEFAULT_CLAMP } from '@components/Posting/constants';
import * as S from './style';

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
  handleClick?: () => void;
};

const Posting = ({ nickName, time, title, infos, viewCount, likeCount, commentCount, isRecruiting, content, tags, clamp = DEFAULT_CLAMP, className, handleClick }: PostingProps) => (
  <S.PostingContainer className={className} onClick={handleClick}>
    <S.SubTitleContainer>
      <S.CenterContainer>
        {isRecruiting ? (
          <S.CustomLabel mode="accent" size="medium">
            모집중
          </S.CustomLabel>
        ) : (
          <S.CustomLabel mode="done" size="medium">
            모집완료
          </S.CustomLabel>
        )}
        <ul style={{ display: 'flex' }}>
          {infos.map((info) => (
            <S.InfoItem key={`posting-${info.id}`} style={{ margin: '0 8px 0 0' }}>
              {info.content}
            </S.InfoItem>
          ))}
        </ul>
      </S.CenterContainer>
      <S.IconContainer>
        <S.IconItem key="icon-view">
          <IconCountBox count={viewCount}>
            <Icon mode="views" />
          </IconCountBox>
        </S.IconItem>
        <S.IconItem key="icon-like">
          <IconCountBox count={likeCount}>
            <Icon mode="thumbsUp" />
          </IconCountBox>
        </S.IconItem>
        <S.IconItem key="icon-comment">
          <IconCountBox count={commentCount}>
            <Icon mode="comment" />
          </IconCountBox>
        </S.IconItem>
      </S.IconContainer>
    </S.SubTitleContainer>
    <S.TitleContainer>
      <S.CustomTitle title={title} />
    </S.TitleContainer>
    <S.CustomPostingContent content={content} clamp={clamp} />
    <LabeList mode="default" size="small" items={tags} />
    <S.InfoContainer>
      <S.NickName title={nickName} />
      <S.TimeTitle title={time} />
    </S.InfoContainer>
  </S.PostingContainer>
);

export default Posting;

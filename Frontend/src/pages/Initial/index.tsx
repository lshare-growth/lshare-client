import Layout from '@components/Layout';
import { useEffect } from 'react';
import IconCountBox from '@components/IconCountBox';
import Icon from '@components/common/Icon';
import Carousel from '@components/Carousel';
import { items as carouselItems } from '@components/Carousel/constants';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import { postings } from '@components/mocks';

import * as S from './style';

const Initial = () => {
  // eslint-disable-next-line no-unused-vars
  const [studies, setStudies] = useRecoilState(studiesState);

  useEffect(() => {
    // TODO: 메인 페이지와 중복 제거
    const setDatas = async () => {
      const url = 'api/studies?page=0&pageSzie=10&sortOrder=COMMENT';
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`);

        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
          return;
        }
        type dataKeyType =
          | 'id'
          | 'title'
          | 'content'
          | 'studyOrganizer'
          | 'studyStatus'
          | 'hashTags'
          | 'currentStudyMemberCount'
          | 'district'
          | 'meeting'
          | 'commentCount'
          | 'viewCount'
          | 'likeCount'
          | 'createdAt'
          | 'maxStudyMemberCount'
          | 'startDate'
          | 'endDate';
        type dataType = Record<dataKeyType, any>;
        const targetDatas: dataType[] = response.data.contents.page;
        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;
        const currentPostings = targetDatas.map((targetData) => {
          const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
            targetData;
          // eslint-disable-next-line prefer-destructuring
          const hashTags: tagType[] = targetData.hashTags;
          const tags = hashTags?.map(({ studyId, tagName }) => ({
            id: studyId,
            content: tagName,
          }));
          return {
            id,
            nickName: studyOrganizer,
            title,
            time: '10분전',
            content,
            tags,
            infos: [
              {
                id: 1,
                type: 'start',
                content: `${startDate}`,
              },
              {
                id: 2,
                type: 'studyWay',
                content: meeting,
              },
              {
                id: 3,
                type: 'limit',
                content: `${maxStudyMemberCount}`,
              },
              {
                id: 4,
                type: 'end',
                content: `${endDate}`,
              },
            ],
            commentCount,
            viewCount,
            likeCount,
            isRecruiting: studyStatus === 'IN_PROGRESS',
            createdDate: createdAt,
            currentStudyMemberCount,
            maxStudyMemberCount,
          };
        });
        setStudies(currentPostings);
      } catch (error: any) {
        console.log(error);
      }
    };
    setDatas();
  }, []);

  return (
    <Layout>
      <S.CarouselContainer>
        <Carousel showingSlideCardNum={1}>
          {carouselItems.map(({ id, content }) => (
            <S.CarouselItem key={`content-${id}`}>{content}</S.CarouselItem>
          ))}
        </Carousel>
      </S.CarouselContainer>
      <S.Container>
        <S.TitleLabel>모집중인 스터디</S.TitleLabel>
        <S.HorizontalDivider direction="horizontal" />
        <S.ItemsContainer>
          {postings.map(({ id, title, content, likeCount, commentCount, isRecruiting, tags }) => (
            <S.Item key={`initial-content-item-${id}`}>
              <S.ReactionsContainer>
                <S.CustomLabel mode="accent" size="medium">
                  {isRecruiting ? '모집중' : '모집완료'}
                </S.CustomLabel>
                <IconCountBox count={likeCount}>
                  <Icon mode="thumbsUp" />
                </IconCountBox>
                <IconCountBox count={commentCount}>
                  <Icon mode="comment" />
                </IconCountBox>
              </S.ReactionsContainer>
              <S.Content>
                <S.CustomLink to={`/api/studies/${id}`}>
                  <S.CustomTitle title={title} />
                  <S.HorizontalDivider direction="horizontal" />
                  <S.CustomPostingContent content={content} clamp={3} />
                </S.CustomLink>
              </S.Content>
              <S.TagContainer>
                {tags.map((tag) => (
                  <S.TagItem key={`initial-page-tag-${tag.id}`}>
                    <span>{tag.content}</span>
                  </S.TagItem>
                ))}
              </S.TagContainer>
            </S.Item>
          ))}
        </S.ItemsContainer>
      </S.Container>
      <S.MoreButtonContainer>
        <S.MoreButton size="small">글 더보기</S.MoreButton>
      </S.MoreButtonContainer>
    </Layout>
  );
};

export default Initial;

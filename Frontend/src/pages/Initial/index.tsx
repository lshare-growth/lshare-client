/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import { useEffect, useState, useRef } from 'react';
import Icon from '@components/common/Icon';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import timeForToday from '@pages/Detail/util';
import studyType from '@components/types/Studies';
import LandingCarousel from '@assets/img/landingCarousel.png';
import { Cookies } from 'react-cookie';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import AlertModalArea from '@components/Modal/AlertModalArea';
import { useLocation, useNavigate } from 'react-router-dom';
import LabelList from '@components/LabelList';
import { getHeaders } from '@pages/util';
import { getLandingStudies } from '@api/studies';
import { studyHashTag } from '@customTypes/studies';
import { STUDY_PATH, INTRODUCE_DETAIL_PATH } from '../../constants/route';
import * as S from './style';

const DEFAUL_PAGE_NUM = 9;
const Initial = () => {
  // eslint-disable-next-line no-unused-vars
  const [studies, setStudies] = useRecoilState(studiesState);
  const [showingStudies, setShowingStudies] = useState<studyType[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  type CotnentControlsKeyType = 'sorted' | 'first' | 'last' | 'empty' | 'hasNext';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const [isStudyLoading, setIsStudyLoading] = useState(true);
  const offset = 0;
  const [limit, setLimit] = useState(0);
  const [isLastContent, setIsLastContent] = useState(false);
  type tagKeyType = 'studyId' | 'tagName' | 'hashTagId';
  type tagType = Record<tagKeyType, any>;
  const cookies = new Cookies();
  type stateKeyType = 'isLogouted';
  type stateType = Record<stateKeyType, any>;
  const location = useLocation();
  const state = location.state as stateType;
  const [isLogoutAlertVisible, setIsLogoutAlertVisible] = useState(false);
  const logoutModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.location);
  }, []);

  useEffect(() => {
    setLimit(offset + DEFAUL_PAGE_NUM * (currentPageIndex + 1));
  }, [currentPageIndex]);

  useEffect(() => {
    if (!contentControls?.hasNext && currentPageIndex > 0) {
      setLimit(limit + DEFAUL_PAGE_NUM);
    }
  }, [contentControls?.hasNext]);

  useEffect(() => {
    if (showingStudies.length < limit) {
      setIsLastContent(true);
    }
  }, [limit, showingStudies]);

  const handleClickMore = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  useEffect(() => {
    // TODO: 메인 페이지와 중복 제거
    const setLandingStudyInfos = async () => {
      const data = await getLandingStudies(currentPageIndex);

      setIsStudyLoading(false);

      type apiStudiesType = typeof data.contents.content[0];
      const apiStudies: apiStudiesType[] = data.contents.content;

      const currentPostings = apiStudies.map((targetData) => {
        const {
          studyId,
          title,
          content,
          studyOrganizer,
          studyStatus,
          progressOfStudy,
          commentCount,
          viewCount,
          likeCount,
          createdAt,
          maxStudyMemberCount,
          currentStudyMemberCount,
          startDate,
          endDate,
        } = targetData;

        const apiTags = data.hashTags;
        const hashTags: studyHashTag[] = apiTags || [];
        const targetTags = hashTags?.filter((hashTag) => hashTag.studyId === studyId);
        const currentTags = targetTags?.map((hashTag) => ({
          id: hashTag.hashTagId,
          content: `#${hashTag.tagName}`,
        }));

        return {
          id: studyId,
          nickName: studyOrganizer,
          title,
          time: timeForToday(createdAt),
          content,
          tags: currentTags,
          infos: [
            {
              id: 1,
              type: 'start',
              content: `${startDate}`,
            },
            {
              id: 2,
              type: 'studyWay',
              content: progressOfStudy,
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
          isRecruiting: studyStatus === 'RECRUITING',
          createdDate: createdAt,
          currentStudyMemberCount,
          maxStudyMemberCount,
        };
      });

      const { sorted, first, last, empty, hasNext } = data.contents;

      setContentControls({
        sorted,
        first,
        last,
        empty,
        hasNext,
      });

      setShowingStudies([...showingStudies, ...currentPostings]);
    };

    if (!contentControls?.hasNext && currentPageIndex > 0) {
      return;
    }

    setLandingStudyInfos();

    setIsStudyLoading(false);
  }, [currentPageIndex]);

  const ITEM_NUM = 6;
  const skeletonItems = Array.from({ length: ITEM_NUM }, (_, index) => index + 1);
  const skeletonLabels = Array.from({ length: 2 }, (_, index) => index + 1);
  const currentShowingStudies = showingStudies.slice(offset, limit);

  const handleLogoutModal = () => {
    setIsLogoutAlertVisible(false);
  };

  const handleLogoutClickCancel = () => {
    setIsLogoutAlertVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      handleLogoutClickCancel();
    }, 2500);
  }, []);

  // TODO : 추후 캐러셀로 변경
  return (
    <Layout>
      <S.CarouselContainer>
        <S.CustomLink to={`${INTRODUCE_DETAIL_PATH}/1`}>
          <S.ImgItem src={LandingCarousel} alt="" width="100%" height="200px" />
        </S.CustomLink>
      </S.CarouselContainer>
      {isStudyLoading ? (
        <S.ItemsContainer>
          {skeletonItems.map((index) => (
            <S.SkeletonLandingPostingItem key={`initial-skeleton-content-item-${index}`}>
              <S.SkeletonReactionsContainer>
                {skeletonLabels.map((skeletonItemIndex) => (
                  <S.SkeletonLabelItem key={`initial-skeleton-${skeletonItemIndex}`}>
                    <S.SkeletonLabel />
                  </S.SkeletonLabelItem>
                ))}
              </S.SkeletonReactionsContainer>
              <S.SkeletonTitle />
              <S.SkeletonContent />
              <S.TagContainer>
                <S.SkeletonTag />
                <S.SkeletonTag />
                <S.SkeletonTag />
              </S.TagContainer>
            </S.SkeletonLandingPostingItem>
          ))}
        </S.ItemsContainer>
      ) : (
        <>
          <S.Container>
            <S.TitleLabel>최신 스터디</S.TitleLabel>
            <S.TitleHorizontalDivider direction="horizontal" />
            <S.ItemsContainer>
              {currentShowingStudies?.map(({ id, title, nickName, content, viewCount, likeCount, commentCount, isRecruiting, tags }) => (
                <S.CustomLink to={`${STUDY_PATH}/${id}`}>
                  <S.Item key={`initial-content-item-${id}`}>
                    <S.ReactionsContainer>
                      <S.CustomLabel size="small" mode={isRecruiting ? 'accent' : 'done'}>
                        {isRecruiting ? '모집중' : '모집완료'}
                      </S.CustomLabel>
                      <div>
                        <S.StudyOrgainzer content={nickName} />
                        <div style={{ display: 'flex' }}>
                          <S.CustomIconCountBox count={viewCount} isShort>
                            <Icon mode="views" color="subTitle" />
                          </S.CustomIconCountBox>
                          <S.CustomIconCountBox count={likeCount}>
                            <Icon mode="thumbsUp" color="subTitle" />
                          </S.CustomIconCountBox>
                          <S.CustomIconCountBox count={commentCount}>
                            <Icon mode="comment" color="subTitle" />
                          </S.CustomIconCountBox>
                        </div>
                      </div>
                    </S.ReactionsContainer>
                    <S.Content>
                      <div>
                        <S.CustomTitle title={title} />
                        <S.HorizontalDivider direction="horizontal" />
                        <S.CustomPostingContent content={content} clamp={3} />
                      </div>
                    </S.Content>
                    <S.CustomLabelList mode="default" size="xsmall" items={tags} />
                  </S.Item>
                </S.CustomLink>
              ))}
            </S.ItemsContainer>
          </S.Container>
          <S.MoreButtonContainer>
            {showingStudies.length > limit && (
              <S.MoreButton size="small" handleClick={handleClickMore}>
                글 더보기
              </S.MoreButton>
            )}
          </S.MoreButtonContainer>
        </>
      )}
    </Layout>
  );
};

export default Initial;

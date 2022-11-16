/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import { useEffect, useState, useRef } from 'react';
import Icon from '@components/common/Icon';
// import Carousel from '@components/Carousel';
// import { items as carouselItems } from '@components/Carousel/constants';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import timeForToday from '@pages/Detail/util';
import studyType from '@components/types/Studies';
import LandingCarousel from '@assets/img/landingCarousel.png';
// import LandingCarousel from '@assets/img/landingCarousel.svg';
// import { postings } from '@components/mocks';
import { Cookies } from 'react-cookie';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import AlertModalArea from '@components/Modal/AlertModalArea';
import { useLocation, useNavigate } from 'react-router-dom';
import LabelList from '@components/LabelList';
import { getHeaders } from '@pages/util';
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

  // TODO : 로그아웃 모달
  // useEffect(() => {
  //   if (state?.isLogouted) {
  //     setIsLogoutAlertVisible(true);
  //   }
  // }, [state?.isLogouted]);

  useEffect(() => {
    setLimit(offset + DEFAUL_PAGE_NUM * (currentPageIndex + 1));
  }, [currentPageIndex]);

  useEffect(() => {
    if (!contentControls?.hasNext && currentPageIndex > 0) {
      setLimit(limit + DEFAUL_PAGE_NUM);
    }

    // if (!contentControls?.hasNext) {
    //   setIsLastContent(true);
    // }
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
    const setDatas = async () => {
      // TODO: 주석풀기
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      // if (!contentControls?.hasNext) {
      //   return;
      // }

      // const body = token ? { headers, withCredentials: true } : { withCredentials: true };
      const body = token ? { headers } : {};

      const url = `api/studies/landing?page=${currentPageIndex}&size=10`;

      // fetch(`api/studies/landing?page=${currentPageIndex}&size=10`, {
      //   method: 'GET',
      //   headers,
      //   credentials: 'include',
      // })
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res?.headers.get('Set-Cookie')); // undefined
      //     console.log(document?.cookie); // nope
      //     return res.json();
      //   })
      //   .then((json) => {});
      // const url = `api/studies/landing?page=${currentPageIndex}&pageSzie=10&sortOrder=CURRENT`;
      const response = await axios.get(`${process.env.END_POINT}${url}`, body);

      setIsStudyLoading(false);

      // try {
      //   const response = await axios.get(`${process.env.END_POINT}${url}`);

      //   if (response.status === 404) {
      //     console.log('404 error');
      //     return;
      //   }
      //   if (response.status === 500) {
      //     console.log('500 error');
      //     return;
      //   }
      // type dataKeyType =
      //   | 'id'
      //   | 'title'
      //   | 'content'
      //   | 'studyOrganizer'
      //   | 'studyStatus'
      //   | 'hashTags'
      //   | 'currentStudyMemberCount'
      //   | 'district'
      //   | 'processOfStudy'
      //   | 'commentCount'
      //   | 'viewCount'
      //   | 'likeCount'
      //   | 'createdAt'
      //   | 'maxStudyMemberCount'
      //   | 'startDate'
      //   | 'endDate'
      //   | 'meeting';
      // type dataType = Record<dataKeyType, any>;
      // const targetDatas: dataType[] = response.content;
      type apiStudiesType = typeof response.data.contents.content[0];
      const apiStudies: apiStudiesType[] = response.data.contents.content;

      // type tagKeyType = 'studyId' | 'tagName';
      // type tagType = Record<tagKeyType, any>;
      const currentPostings = apiStudies.map((targetData) => {
        // const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
        //   targetData;
        // API 활용시
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

        const apiTags = response.data.hashTags;
        const hashTags: tagType[] = apiTags || [];
        const targetTags = hashTags?.filter((hashTag) => hashTag.studyId === studyId);
        const currentTags = targetTags?.map((hashTag) => ({
          id: hashTag.hashTagId,
          content: `#${hashTag.tagName}`,
        }));
        // TODO: API
        /**
             *   const { id, title, content, studyOrganizer, studyStatus, processOfStudy, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
            response.content;

            const { nickName } = response;
            50줄 type에서 meeting제거하기
             */
        // eslint-disable-next-line prefer-destructuring
        // const hashTags = [
        //   { studyId: 1, tagName: 'java' },
        //   { studyId: 2, tagName: 'javascript' },
        // ];

        // eslint-disable-next-line no-shadow
        // const tags =
        //   // eslint-disable-next-line no-shadow
        //   hashTags?.map(({ studyId, tagName }) => ({
        //     id: studyId,
        //     content: `#${tagName}`,
        //   })) || [];

        // TODO: API : 해시태그 백엔드 미정
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
      // const remainStudies = studies.filter(({id}))
      /// setStudies([...studies, ...currentPostings]);
      // const remainStudies = studies.map(({ id }) => currentPostings.filter((posting) => id !== posting.id));

      // if (currentPageIndex > 0) {
      //   setShowingStudies([...currentPostings, ...showingStudies]);
      // } else {
      //   setStudies([...currentPostings]);
      //   // setShowingStudies([...showingStudies, ...currentPostings]);
      //   setShowingStudies(currentPostings);
      // }

      // setStudies([...studies, ...currentPostings]);
      // setShowingStudies([...currentPostings, ...showingStudies]);
      //   } catch (error: any) {
      //     console.log(error);
      //   }

      const { sorted, first, last, empty, hasNext } = response.data.contents;

      setContentControls({
        sorted,
        first,
        last,
        empty,
        hasNext,
      });

      setShowingStudies([...showingStudies, ...currentPostings]);
      // if (!hasNext) {
      //   // setShowingStudies([...currentPostings]);
      //   setShowingStudies([...showingStudies, ...currentPostings]);
      // } else {
      //   currentPostings.pop();
      //   setShowingStudies([...showingStudies, ...currentPostings]);
      //   // setShowingStudies([...showingStudies, ...currentPostings]);
      // }
    };

    if (!contentControls?.hasNext && currentPageIndex > 0) {
      return;
    }
    setDatas();

    // setTimeout(() => {
    // }, 2000);
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
        {/* <Carousel showingSlideCardNum={1}>
          {carouselItems.map(({ id, content }) => (
            <S.CarouselItem key={`content-${id}`}>{content}</S.CarouselItem>
          ))}
        </Carousel> */}
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
                    {/* <S.TagContainer>
                      {tags.map((tag) => (
                        <S.TagItem key={`initial-page-tag-${tag.id}`}>
                          <span>{tag.content}</span>
                        </S.TagItem>
                      ))}
                    </S.TagContainer> */}
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
      {/* <Portal>
        {isLogoutAlertVisible && (
          <Modal position="right" onClose={handleLogoutModal} ref={logoutModalRef}>
            <AlertModalArea size="small" handleClickCancel={handleLogoutClickCancel}>
              로그아웃되었습니다.
            </AlertModalArea>
          </Modal>
        )}
      </Portal> */}
    </Layout>
  );
};

export default Initial;

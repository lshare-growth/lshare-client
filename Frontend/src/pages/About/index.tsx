/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { LoadingContainer } from '@pages/Detail/style';
import userInfosState from '@store/UserInfos';
import useLogOut from '@hooks/useLogout';
import Image from '@components/common/Image';
import { Cookies } from 'react-cookie';
import * as S from './style';
import { ETC_PATH, INTRODUCE_DETAIL_PATH, LOGIN_PATH, NEW_STUDY_PATH, LANDING_PATH, SERVER_ERROR_PATH, INTRODUCE_PATH } from '../../constants/route';

const About = () => {
  const DEFAULT_SIZE_NUM = 10;
  type noticeKeyType = 'noticeId' | 'nickName' | 'profileImageUrl' | 'noticeTitle' | 'noticeContent' | 'createdAt' | 'lastModifiedAt';
  type noticeType = Record<noticeKeyType, any>;
  const [studies, setStudies] = useState<noticeType[]>([]);
  const [userInfos] = useRecoilState(userInfosState);
  // const [selectedTabId, setSelectedTabId] = useState(0);
  // const [selectedProgressTabId, setSelectedProgressTabId] = useState(0);
  // const [currentPageIndex, setCurrentPageIndex] = useState(1);
  type CotnentControlsKeyType = 'sorted' | 'requestPageSize' | 'currentPageNumber' | 'totalElementSize' | 'firstPage' | 'last' | 'empty';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  // eslint-disable-next-line no-unused-vars
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const [isStudyLoading, setIsStudyLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { logout } = useLogOut();
  const initialPageIndex = 1;
  const [showingPageIndex, setShowingPageIndex] = useState(
    // initialPageIndex ||
    (location?.search.includes('tagName') && initialPageIndex) || sessionStorage.getItem('page') || location?.search?.split('page=')[1]?.split('&')[0]
  );
  const [currentPageIndex, setCurrentPageIndex] = useState(
    // initialPageIndex ||
    (location?.search.includes('tagName') && initialPageIndex) || Number(location?.search?.split('page=')[1]?.split('&')[0])
  );
  const handleClickPageButton = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    setShowingPageIndex(`${pageIndex}`);
  };

  const handleClickPrevPage = () => {
    setCurrentPageIndex(currentPageIndex - 1);
    setShowingPageIndex(`${currentPageIndex - 1}`);
  };

  const handleClickNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
    setShowingPageIndex(`${currentPageIndex + 1}`);
  };

  const setDatas = async () => {
    if (!currentPageIndex) {
      return;
    }
    const sizeNum = location?.search?.split('size=')[1];
    const size = sizeNum || DEFAULT_SIZE_NUM;
    const url = `api/notices?page=${currentPageIndex - 1}&size=${size}`;
    try {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };

      // const body = token ? { headers, withCredentials: true } : { withCredentials: true };
      const body = token ? { headers } : {};

      const response = await axios.get(`${process.env.END_POINT}${url}`, body);

      const { sorted, requestPageSize, currentPageNumber, totalElementSize, firstPage, last, empty } = response.data.page;

      setContentControls({
        sorted,
        requestPageSize,
        currentPageNumber,
        totalElementSize: Math.ceil(totalElementSize / requestPageSize),
        firstPage,
        last,
        empty,
      });

      setStudies([...response.data.page.page]);
    } catch (error: any) {
      if (error.response.status === 401) {
        logout();
        navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
        return;
      }
      if (error.response.status === 404) {
        navigate(`${ETC_PATH}`);
        return;
      }
      if (error.response.status === 500) {
        navigate(`${SERVER_ERROR_PATH}`);
      }
    }
  };

  useEffect(() => {
    setIsStudyLoading(true);

    setDatas();

    setIsStudyLoading(false);
  }, [currentPageIndex]);

  // TODO: Main과 중복제거
  useEffect(() => {
    // if (currentPageIndex === 0) {
    //   return;
    // }
    // const searchTag = sessionStorage.getItem('tag');
    // // if (location.pathname === MAIN_PATH) {
    // // if (!currentPageIndex) {
    // //   return;
    // // }
    // if (searchTag) {
    //   return;
    // }

    const sizeNum = location?.search?.split('size=')[1];

    const sizeQueryString = sizeNum ? `&size=${sizeNum}` : `&size=${DEFAULT_SIZE_NUM}`;

    const pageQueryString = currentPageIndex ? `${INTRODUCE_PATH}?page=${currentPageIndex}` : `${INTRODUCE_PATH}?page=${initialPageIndex}`;
    const queryStrings = sizeQueryString ? `${pageQueryString}${sizeQueryString}` : pageQueryString;
    const showingURL = showingPageIndex ? queryStrings : `${INTRODUCE_PATH}`;

    // TODO: 로직 분리
    // if (state?.isSearched) {
    //   setIsStudyLoading(false);
    //   setContentControls(state?.contentControls);
    //   return;
    // }

    // const tag = sessionStorage.getItem('tag');
    // if (tag) {
    //   return;
    // }

    setIsStudyLoading(true);
    setDatas();

    setIsStudyLoading(false);
    //
    navigate(showingURL);
  }, [showingPageIndex, currentPageIndex]);

  // TODO: Main과 중복제거
  useEffect(() => {
    if (!currentPageIndex) {
      setCurrentPageIndex(1);
    }
  }, [currentPageIndex]);

  useEffect(() => {
    // const currentPostings = studies.map(({id}) => {
    // const response = await axios.get(`${process.env.END_POINT}api/tags/study/${id}`, { headers });
    // console.log(response);
    // }
    // const studiesKeys = studies.map((study) => Object.keys(study));
    // const allIds = studiesKeys.map((id) => id);
    // const allIds = [];
    // const allUrls: string[] = [];
    // const url = `${process.env.END_POINT}api/tags/study`;
    // // eslint-disable-next-line no-restricted-syntax
    // for (const study of studies) {
    //   allIds.push(study.id);
    //   allUrls.push(`${process.env.END_POINT}api/tags/study/${study.id}`);
    // }
    // console.log('allIds');
    // console.log(allIds);
    // // const getAllTags = () => Promise.all();
    // // eslint-disable-next-line no-shadow
    // const token = localStorage.getItem('accessToken');
    // const refreshToken = cookies.get(`SEC_EKIL15`);
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   RefreshToken: `Bearer ${refreshToken}`,
    //   'Content-Type': 'application/json',
    // };
    // // eslint-disable-next-line no-shadow
    // const fetchData = async (url: string) =>
    //   axios
    //     .get(url, { headers })
    //     .then((response) => response)
    //     .catch((error) => {
    //       if (error.response.status === 401) {
    //         console.log('401 error');
    //         logout();
    //         navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
    //       }
    //       if (error.response.status === 404) {
    //         navigate(`${LANDING_PATH}`);
    //       }
    //       if (error.response.status === 500) {
    //         navigate(`${SERVER_ERROR_PATH}`);
    //       }
    //     });
    // const getAllData = async () => Promise.all(allUrls.map(fetchData));
    // getAllData()
    //   .then((result) => {
    //     console.log('result====!!!!!!!!!!!!!!!');
    //     console.log(result);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // const token = localStorage.getItem('accessToken');
    // const refreshToken = cookies.get(`SEC_EKIL15`);
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   RefreshToken: `Bearer ${refreshToken}`,
    //   'Content-Type': 'application/json',
    // };
    // const getTag = async () => {
    //   const res = await axios.get(`${process.env.END_POINT}api/hashtags/study/10`, { headers });
    //   console.log('tag -=====');
    //   console.log(res);
    // };
    // getTag();
  }, []);

  // currentPageIndex, studies
  // const handleClickProgressTab = (selectedId: number) => {
  //   setSelectedProgressTabId(selectedId);
  // };

  // const handleClickTab = (selectedId: number) => {
  //   setSelectedTabId(selectedId);
  // };

  // eslint-disable-next-line no-unused-vars
  const handleClickPosting = () => {
    if (!userInfos.memberId) {
      // TODO: 로그인 페이지 이동
      return;
    }
    navigate(`${NEW_STUDY_PATH}`);
  };

  const DEFAULT_SHOWING_PAGE_NUM = 5;
  let showingPageButtonNum = contentControls?.totalElementSize > DEFAULT_SHOWING_PAGE_NUM ? DEFAULT_SHOWING_PAGE_NUM : contentControls?.totalElementSize;
  if (showingPageButtonNum === 0) {
    showingPageButtonNum = 1;
  }

  // const ITEM_NUM = 3;
  // const skeletonItems = Array.from({ length: ITEM_NUM }, (_, index) => index + 1);

  return (
    <Layout>
      {/* {isStudyLoading && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )} */}
      <S.Container>
        {/* <S.FlexBetween>
          <S.Category>전체 스터디</S.Category>
          <Button mode="accent" size="small" handleClick={handleClickPosting}>
            글 작성
          </Button>
        </S.FlexBetween> */}
        {/* <S.HorizontalDivider direction="horizontal" /> */}
        {
          <S.NoticeContainer>
            <S.TitleLabel>공지사항</S.TitleLabel>
            <S.HorizontalDivider direction="horizontal" />
            {isStudyLoading ? (
              <S.LoadingContainer>
                <LoadingSpinner />
              </S.LoadingContainer>
            ) : (
              <S.PostingContainer isPostingExist={!contentControls?.empty && currentPageIndex > 0}>
                {!contentControls?.empty &&
                  currentPageIndex > 0 &&
                  studies?.map(({ noticeId, nickName, profileImageUrl, noticeTitle }) => (
                    <S.CustomLink to={`${INTRODUCE_DETAIL_PATH}/${noticeId}`}>
                      <S.NoticeItem key={`About-page-notice-${noticeId}`}>
                        <Image src={profileImageUrl} alt="" handleError={() => {}} mode="square" size="megaLarge" />
                        <S.Content>
                          <S.NoticeCategory>공지사항</S.NoticeCategory>
                          <S.CustomCommentContent content={noticeTitle} clamp={1} />
                          <S.NickName>{nickName}</S.NickName>
                        </S.Content>
                      </S.NoticeItem>
                    </S.CustomLink>
                    // <>
                    //   <S.CustomLink to={`${INTRODUCE_DETAIL_PATH}/${id}`}>
                    //     <S.PostingItem key={`main-posting-${id}`}>
                    //       <S.TitleContainer>
                    //         <S.CustomTitle title={title} />
                    //       </S.TitleContainer>
                    //       <S.CustomPostingContent content={content} clamp={clamp} />
                    //       {/* <Posting
                    //         nickName={nickName}
                    //         time={time}
                    //         title={title}
                    //         infos={infos}
                    //         viewCount={viewCount}
                    //         likeCount={likeCount}
                    //         commentCount={commentCount}
                    //         isRecruiting={isRecruiting}
                    //         content={content}
                    //         tags={tags}
                    //         handleClick={handleClickPosting}
                    //       /> */}
                    //     </S.PostingItem>
                    //   </S.CustomLink>
                    //   <S.HorizontalDivider direction="horizontal" />
                    // </>
                  ))}
                {contentControls?.empty ||
                  (currentPageIndex <= 0 && (
                    <S.FlexBox>
                      <S.EmptyMsg>글이 존재하지 않습니다.</S.EmptyMsg>
                    </S.FlexBox>
                  ))}
                {/* {!contentControls?.empty && currentPageIndex <= 0} */}
              </S.PostingContainer>
            )}
            {!contentControls?.empty && currentPageIndex > 0 && (
              <S.CustomPagination
                showingPageButtonNum={showingPageButtonNum}
                totalPageNum={contentControls?.totalElementSize}
                selectedPage={currentPageIndex}
                handleClickPageButton={handleClickPageButton}
                handleClickLeftButton={handleClickPrevPage}
                handleClickRightButton={handleClickNextPage}
              />
            )}
          </S.NoticeContainer>
        }
      </S.Container>
    </Layout>
  );
};

export default About;

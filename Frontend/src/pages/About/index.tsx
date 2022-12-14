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
import { getHeaders } from '@pages/util';
import * as S from './style';
import { ETC_PATH, INTRODUCE_DETAIL_PATH, LOGIN_PATH, NEW_STUDY_PATH, LANDING_PATH, SERVER_ERROR_PATH, INTRODUCE_PATH } from '../../constants/route';

const About = () => {
  const DEFAULT_SIZE_NUM = 10;
  type noticeKeyType = 'noticeId' | 'nickName' | 'profileImageUrl' | 'noticeTitle' | 'noticeContent' | 'createdAt' | 'lastModifiedAt';
  type noticeType = Record<noticeKeyType, any>;
  const [studies, setStudies] = useState<noticeType[]>([]);
  const [userInfos] = useRecoilState(userInfosState);
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
    (location?.search.includes('tagName') && initialPageIndex) || sessionStorage.getItem('page') || location?.search?.split('page=')[1]?.split('&')[0]
  );
  const [currentPageIndex, setCurrentPageIndex] = useState((location?.search.includes('tagName') && initialPageIndex) || Number(location?.search?.split('page=')[1]?.split('&')[0]));
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
      const headers = getHeaders();

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

  // TODO: Main??? ????????????
  useEffect(() => {
    const sizeNum = location?.search?.split('size=')[1];
    const sizeQueryString = sizeNum ? `&size=${sizeNum}` : `&size=${DEFAULT_SIZE_NUM}`;
    const pageQueryString = currentPageIndex ? `${INTRODUCE_PATH}?page=${currentPageIndex}` : `${INTRODUCE_PATH}?page=${initialPageIndex}`;
    const queryStrings = sizeQueryString ? `${pageQueryString}${sizeQueryString}` : pageQueryString;
    const showingURL = showingPageIndex ? queryStrings : `${INTRODUCE_PATH}`;

    setIsStudyLoading(true);
    setDatas();

    setIsStudyLoading(false);
    navigate(showingURL);
  }, [showingPageIndex, currentPageIndex]);

  // TODO: Main??? ????????????
  useEffect(() => {
    if (!currentPageIndex) {
      setCurrentPageIndex(1);
    }
  }, [currentPageIndex]);

  // eslint-disable-next-line no-unused-vars
  const handleClickPosting = () => {
    if (!userInfos.memberId) {
      // TODO: ????????? ????????? ??????
      return;
    }
    navigate(`${NEW_STUDY_PATH}`);
  };

  const DEFAULT_SHOWING_PAGE_NUM = 5;
  let showingPageButtonNum = contentControls?.totalElementSize > DEFAULT_SHOWING_PAGE_NUM ? DEFAULT_SHOWING_PAGE_NUM : contentControls?.totalElementSize;
  if (showingPageButtonNum === 0) {
    showingPageButtonNum = 1;
  }

  return (
    <Layout>
      <S.Container>
        <S.NoticeContainer>
          <S.TitleLabel>????????????</S.TitleLabel>
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
                        <S.NoticeCategory>????????????</S.NoticeCategory>
                        <S.CustomCommentContent content={noticeTitle} clamp={1} />
                        <S.NickName>{nickName}</S.NickName>
                      </S.Content>
                    </S.NoticeItem>
                  </S.CustomLink>
                ))}
              {contentControls?.empty ||
                (currentPageIndex <= 0 && (
                  <S.FlexBox>
                    <S.EmptyMsg>?????? ???????????? ????????????.</S.EmptyMsg>
                  </S.FlexBox>
                ))}
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
      </S.Container>
    </Layout>
  );
};

export default About;

/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import Comment from '@components/Comment';
import useMouse from '@hooks/useMouse';
import Title from '@components/common/Title';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect, useState, useRef } from 'react';
import replyType from '@components/types/Comment';
import commentState from '@store/Comment';
import studyType from '@components/types/Studies';
import LoadingSpinner from '@components/common/LoadingSpinner';
import axios from 'axios';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import userInfosState from '@store/UserInfos';
import useLogOut from '@hooks/useLogout';
import reactionsState from '@store/Reactions';
import { Cookies } from 'react-cookie';
import { getHeaders } from '@pages/util';
import * as S from './style';
import { INTRODUCE_PATH, ETC_PATH, MAIN_PATH, UPDATE_PATH, LANDING_PATH, SERVER_ERROR_PATH, LOGIN_PATH } from '../../constants/route';

const items = [
  { id: 1, content: '', nickName: '이든' },
  { id: 2, content: '', nickName: 'Jun' },
  { id: 3, content: '', nickName: '방태' },
  { id: 4, content: '', nickName: 'Jay' },
  { id: 5, content: '', nickName: 'crong' },
  { id: 6, content: '', nickName: '호눅스' },
];
const participants = 3;
const maxPeople = 5;
const peoples = `${participants}/${maxPeople}`;
const DEFAUL_PAGE_NUM = 10;
const Detail = () => {
  type noticeKeyType = 'noticeId' | 'nickName' | 'profileImageUrl' | 'noticeTitle' | 'noticeContent' | 'createdAt' | 'lastModifiedAt';
  type noticeType = Record<noticeKeyType, any>;
  const navigate = useNavigate();
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const { id } = useParams<{ id: string }>();
  const currentId = Number(id);
  type CotnentControlsKeyType = 'sorted' | 'first' | 'last' | 'empty' | 'hasNext';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  type usreInfokeyType = 'memberId' | 'nickName' | 'notification' | 'profileImage';

  type userInfoType = Record<usreInfokeyType, any>;
  const [userInfos] = useRecoilState<userInfoType>(userInfosState);
  const [currentUserInfos, setCurrentUserInfos] = useState<userInfoType>(userInfos);
  const [reactions, setReactions] = useState(reactionsState);
  const [currentReplyNum, setCurrentReplyNum] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const { logout } = useLogOut();

  type keyType =
    | 'id'
    | 'nickName'
    | 'memberId'
    | 'studyOrganizer'
    | 'time'
    | 'title'
    | 'infos'
    | 'viewCount'
    | 'likeCount'
    | 'commentCount'
    | 'isRecruiting'
    | 'content'
    | 'tags'
    | 'createdDate'
    | 'maxStudyMemberCount'
    | 'currentStudyMemberCount'
    | 'isAuthorized';
  //    | 'myId'

  type currentStudyType = Record<keyType, any>;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [study, setStudy] = useState<noticeType>();
  const [isShowingLiked, setIsShowingLiked] = useState(false);
  const [showingLikeCount, setShowingLikeCount] = useState(0);
  const [isStudyRecruiting, setIsStudyRecruiting] = useState(false);
  // TODO: any 타입 구체화
  const [comments, setComments] = useRecoilState(commentState);
  const [currentComments, setCurrentComments] = useState<replyType[]>([]);
  type memberKeyType = 'id' | 'content' | 'nickName';
  type memberType = Record<memberKeyType, any>;
  const [studyMembers, setStudyMembers] = useState<memberType[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const nextIndex = 1;
  const [contentPageIdx, setContentPageIdx] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isStudyLoading, setIsStudyLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const lastPageIdx = 5;
  const cookies = new Cookies();

  useEffect(() => {
    setCurrentUserInfos(userInfos);
  }, [userInfos.nickName]);

  useEffect(() => {
    const getStudy = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        const body = token ? { headers } : {};

        const response = await axios.get(`${process.env.END_POINT}api/notices/${currentId}`, body);

        setStudy(response.data);
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

    setIsStudyLoading(true);

    getStudy();

    setIsStudyLoading(false);
  }, [userInfos]);

  const handleClickEdit = () => {
    navigate(`${UPDATE_PATH}?study_id=${currentId}`); /// ${study?.id}
    // navigate(`?study_id=${currentId}`);
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const handleClickRegister = () => {
    const postStudySignUp = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      // const data = {
      //   studyId,
      // };
      const headers = getHeaders();

      const body = token
        ? {
            headers,
          }
        : {};
      try {
        const response = await axios.post(`${process.env.END_POINT}api/studies/${currentId}/studyRequest`, undefined, body);
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
    postStudySignUp();
  };

  const handleClickCancel = () => {};

  // const handleClickConfirm = () => {
  //   deleteCurrentStudy();
  // };

  const handleModal = () => {
    setIsModalVisible(false);
  };

  const offset = 0;
  const limit = offset + DEFAUL_PAGE_NUM * (contentPageIdx + 1);

  const handleClickList = () => {
    navigate(`${INTRODUCE_PATH}`);
  };

  return (
    <Layout>
      <S.Container>
        {isStudyLoading ? (
          <S.LoadingContainer>
            <LoadingSpinner />
          </S.LoadingContainer>
        ) : (
          <div style={{ margin: '64px 0 16px 0', flex: '1 1 0px' }}>
            <div style={{ display: 'flex', margin: '0 0 32px 0' }}>
              <S.OrganizerAvatar src={study?.profileImageUrl} alt="" />
              <div>
                <S.CustomCommentLabel isMyComment={false} isStudyOrganizer={false} nickname={study?.nickName || '닉네임'} />
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
                  <S.Day>{study?.createdAt.slice().split('T')[0]}</S.Day>
                  {/* <S.Count count={study?.viewCount || 0}>
                    <Icon mode="views" />
                  </S.Count> */}
                </div>
              </div>
            </div>
            <S.Title>{study?.noticeTitle}</S.Title>
            <S.HorizontalDivider direction="horizontal" />
            <S.Content>{study?.noticeContent || '성실하게 스터디하실 분 찾습니다. 성실하게 스터디하실 분 찾습니다. 성실하게 스터디하실 분 찾습니다.'}</S.Content>
          </div>
        )}
        <S.ButtonContainer>
          <Button size="small" handleClick={handleClickList}>
            목록으로
          </Button>
        </S.ButtonContainer>
      </S.Container>
    </Layout>
  );
};

export default Detail;

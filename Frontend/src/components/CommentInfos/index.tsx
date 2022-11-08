/* eslint-disable react/require-default-props */
import Avatar from '@components/common/Avatar';
import Profile from '@assets/img/Avatar.png';
import { useState, useRef, useEffect } from 'react';
import useMouse from '@hooks/useMouse';
import { Cookies } from 'react-cookie';
import useLogOut from '@hooks/useLogout';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import hoverInfosState from '@store/HoverInfos';
import { useRecoilState } from 'recoil';
import userInfosState from '@store/UserInfos';
import isAlertModalVisibleState from '@store/AlertModal';
import { getHeaders } from '@pages/util';
import * as S from './style';
import { LOGIN_PATH, ETC_PATH, SERVER_ERROR_PATH } from '../../constants/route';

type CommentInfosProps = {
  avatorSrc: string;
  avatorAlt: string;
  nickname: string;
  time: string;
  isEdited: boolean;
  isDeleted: boolean;
  isStudyOrganizer: boolean;
  isMyComment: boolean;
  isLoading?: boolean;
  isHighlighting?: boolean;
  writerId?: number;
  isHoverLoading?: boolean;
  doingHoverLoading?: () => void;
  doneHoverLoading?: () => void;
};

const ITEM_NUM = 3;
const skeletonItems = Array.from({ length: ITEM_NUM }, (_, index) => index + 1);

const CommentInfos = ({
  writerId,
  isLoading,
  isDeleted,
  avatorSrc,
  avatorAlt,
  nickname = '닉네임',
  time = '10분',
  isEdited,
  isStudyOrganizer,
  isMyComment,
  isHighlighting = true,
  isHoverLoading,
  doingHoverLoading,
  doneHoverLoading,
}: CommentInfosProps) => {
  const handleClickUserInfo = () => {
    if (isDeleted) {
      return;
    }
    window.location.href = `/${nickname}`;
  };
  const [userInfos] = useRecoilState(userInfosState);
  const cookies = new Cookies();
  const { logout } = useLogOut();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const [isFollowing, setIsFollowing] = useState(false);
  type profileKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'introduction' | 'githubLink' | 'district';
  type profileType = Record<profileKeyType, any>;
  const [profiles, setProfiles] = useState<profileType[]>([]);
  const [isAlertModalVisible, setIsAlertModalVisible] = useRecoilState(isAlertModalVisibleState);

  // const [isHoverLoading, setIsHoverLoading] = useState(false);
  // memberId, nickName, profileImageUrl, introduction, githubLink, district
  const [currentProfile, setCurrentProfile] = useState<profileType>({
    memberId: 0,
    profileImageUrl: '',
    nickName: '',
    introduction: '',
    district: '',
    githubLink: '',
    // blogUrl: '',
  });
  const [hoverInfos, setHoverInfos] = useRecoilState(hoverInfosState);

  useEffect(() => {
    if (!userInfos.memberId) {
      setIsFollowing(false);
    }
  }, [userInfos.memberId]);

  const handleClickFollow = () => {
    const follow = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const data = {
        targetId: writerId,
      };
      const body = token ? { headers } : {};
      const url = `api/members/following`;
      try {
        const response = await axios.post(`${process.env.END_POINT}${url}`, data, body);
        setIsFollowing(!isFollowing);
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          // navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          setIsAlertModalVisible(true);
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

    follow();
  };

  useEffect(() => {
    if (isHoverLoading) {
      return;
    }
    const getIsFollowing = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const body = token ? { headers } : {};

      const url = `api/members/${writerId}/friendship/follow-history`;
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        const apiData = response.data.followHistory;
        // const data = {
        //   followHistory: 'EXIST', // NON_EXIST
        // };
        // const apiData = data.followHistory;
        const currentIsFollowing = apiData === 'EXIST';
        setIsFollowing(currentIsFollowing);
        const existProfile = hoverInfos.find(({ memberId }) => memberId === writerId);
        const remainProfiles = hoverInfos.filter(({ memberId }) => memberId !== writerId);
        const newProfiles = [
          ...remainProfiles,
          {
            memberId: existProfile?.memberId,
            nickName: existProfile?.nickName,
            profileImageUrl: existProfile?.profileImageUrl,
            introduction: existProfile?.introduction,
            githubLink: existProfile?.githubLink,
            district: existProfile?.district,
            isFollowing: currentIsFollowing,
          },
        ];
        setHoverInfos(newProfiles);
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

    if (writerId) {
      const existProfile = hoverInfos.find(({ memberId }) => memberId === writerId);
      if (!existProfile) {
        return;
      }
      if (existProfile?.isFollowing === null) {
        getIsFollowing();
      } else {
        setCurrentProfile(existProfile);
      }
    }
  }, [currentProfile]);

  const handleMouse = () => {
    if (isHoverLoading) {
      return;
    }

    const getProfile = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const body = token ? { headers } : {};

      const url = `api/members/${writerId}/hover-info`;
      try {
        // setIsHoverLoading(true);
        if (doingHoverLoading) {
          doingHoverLoading();
        }
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        const { data } = response;

        const { memberId, nickName, profileImageUrl, introduction, githubLink, district } = data;

        const newProfile = {
          memberId,
          nickName,
          profileImageUrl,
          introduction,
          githubLink,
          district,
          isFollowing: null,
        };
        setHoverInfos([...hoverInfos, newProfile]);
        setCurrentProfile(newProfile);
        // setIsHoverLoading(false);
        if (doneHoverLoading) {
          doneHoverLoading();
        }
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

    if (!currentProfile.memberId) {
      const existProfile = hoverInfos.find(({ memberId }) => memberId === writerId);
      if (!existProfile) {
        if (writerId) {
          getProfile();
        }
      } else {
        setCurrentProfile(existProfile);
      }
    }
    handleMouseOver();
  };

  return isLoading ? (
    <S.Container>
      <S.SkeletonAvator />
      <ul style={{ display: 'flex' }}>
        {skeletonItems.map((skeletonItemIndex) => (
          <S.SkeletonItem key={`CommentInfos-skeleton-${skeletonItemIndex}`}>
            <S.SkeletonSmallLabel />
          </S.SkeletonItem>
        ))}
      </ul>
    </S.Container>
  ) : (
    <S.Container onMouseOut={handleMouseOut}>
      <S.UserInfo onClick={handleClickUserInfo} onMouseOver={handleMouse}>
        {avatorSrc ? <Avatar src={avatorSrc} alt={avatorAlt} /> : <img src={Profile} alt="default avatar" />}
        <S.CustomCommentLabel isHighlighting={isHighlighting} isDeleted={isDeleted} isStudyOrganizer={isStudyOrganizer} isMyComment={isMyComment} nickname={nickname} />
      </S.UserInfo>
      <S.Time>{`${time}`}</S.Time>
      {!isDeleted && isEdited ? <S.IsEdited>(수정됨)</S.IsEdited> : ''}
      {!isDeleted && isMouseOvered && (
        <S.ProfileCard onMouseOver={handleMouseOver}>
          <S.FlexBetween>
            <Avatar size="small" src={currentProfile?.profileImageUrl} handleClick={handleClickUserInfo} />
            {userInfos.nickName !== nickname && (
              <S.FollowButton size="xsmall" handleClick={handleClickFollow} isFollowing={isFollowing}>
                {isFollowing ? <S.FollowMsg>언팔로우</S.FollowMsg> : <S.FollowMsg>팔로우</S.FollowMsg>}
              </S.FollowButton>
            )}
          </S.FlexBetween>
          {/* <S.NickName onClick={handleClickUserInfo}>{currentProfile?.nickName}</S.NickName> */}
          <S.CustomNickName handleClick={handleClickUserInfo} clamp={1} content={currentProfile?.nickName} />
          <S.Introducion content={currentProfile?.introduction} clamp={2} />
          <S.InfoContainer>
            <S.CustomIcon mode="district" color="disabled" />
            <S.Info>{currentProfile?.district || '미선택'}</S.Info>
          </S.InfoContainer>
          {currentProfile?.githubLink && (
            <S.InfoContainer>
              <S.CustomIcon mode="githubUrl" color="disabled" />
              <S.CustomTextButton handleClick={() => window.open(`${currentProfile?.githubLink}`, '_blank')}>깃허브 주소</S.CustomTextButton>
            </S.InfoContainer>
          )}
          {/* <S.InfoContainer>
            <S.CustomIcon mode="link" color="disabled" />
            <S.CustomTextButton handleClick={() => window.open(`${currentProfile?.githubLink}`, '_blank')}>블로그 주소</S.CustomTextButton>
          </S.InfoContainer> */}
        </S.ProfileCard>
      )}
    </S.Container>
  );
};

export default CommentInfos;

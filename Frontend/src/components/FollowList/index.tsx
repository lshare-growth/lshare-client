/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import Avatar from '@components/common/Avatar';
import { useState, useRef, useEffect } from 'react';
import useMouse from '@hooks/useMouse';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import useLogOut from '@hooks/useLogout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userInfosState from '@store/UserInfos';
import { contents } from '@pages/MemberDetail/constants';
import isAlertModalVisibleState from '@store/AlertModal';
import * as S from './style';
import { LOGIN_PATH, ETC_PATH, SERVER_ERROR_PATH } from '../../constants/route';

type profileKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'introduction' | 'githubLink' | 'district';
type profileType = Record<profileKeyType, any>;
type followKeyType = 'memberId' | 'profileImageUrl' | 'nickName' | 'isFollowing';
type followType = Record<followKeyType, any>;
type FollowListProps = {
  // eslint-disable-next-line react/require-default-props
  id: number;
  className?: string;
  avatorSrc: string;
  nickName: string;
  previousY: number;
  increasingTop: number;
  isScrollStopped: boolean;
  handlePreviousY: (currentY: number) => void;
  handleIncreasingTop: (currentY: number, isTop: boolean) => void;
  initialIsFollowing: boolean;
  followsLength: number;
  userMemberId: number;
  increaseFollowing: (targetFollowing: followType) => void;
  decreaseFollowing: (targetFollowing: followType) => void;
  addProfile: (newProfile: profileType) => void;
  profiles: profileType[];
  isLoading: boolean;
  doingLoading: () => void;
  doneLoading: () => void;
  followMode: string;
  updateFollowings: (editedFollowing: followType) => void;
  updateFollowers: (editedFollowing: followType) => void;
};
const FollowList = ({
  id,
  className,
  avatorSrc,
  nickName,
  followsLength,
  previousY,
  handlePreviousY,
  handleIncreasingTop,
  increasingTop,
  isScrollStopped,
  initialIsFollowing,
  userMemberId,
  increaseFollowing,
  decreaseFollowing,
  addProfile,
  profiles,
  isLoading,
  doingLoading,
  doneLoading,
  followMode,
  updateFollowings,
  updateFollowers,
}: FollowListProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const ref = useRef<HTMLDivElement>(null);
  const cookies = new Cookies();
  const { logout } = useLogOut();
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfos] = useRecoilState(userInfosState);
  const [hoverIds, setHoverIds] = useState<number[]>([]);
  const [movedHeight, setMovedHeight] = useState(0);
  // const [previousY, setPreviousY] = useState<number[]>([]);
  // const [increasingTop, setIncreasingTop] = useState(40);
  const [isTop, setIsTop] = useState(false);
  const [smallGroup, setSmallGroup] = useState<number[]>([]);
  const [isAlertModalVisible, setIsAlertModalVisible] = useRecoilState(isAlertModalVisibleState);

  useEffect(() => {
    if (!userInfos.memberId) {
      setIsFollowing(false);
    }
  }, [userInfos.memberId]);

  // useEffect(() => {
  //   handlePreviousY(391);
  // }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {});
    // window.addEventListener(
    //   'scroll',
    //   (event) => {
    //     // Clear our timeout throughout the scroll
    //     console.log('mouse out');
    //     // Set a timeout to run after scrolling ends
    //     const isScrolling = setTimeout(() => {
    //       // Run the callback
    //       console.log('mouse out!!!');
    //       handleMouseOut();
    //     }, 66);
    //     window.clearTimeout(isScrolling);
    //   },
    //   false
    // );
  }, []);

  // const initialProfile = {
  //   id: 1,
  //   avatarSrc: '',
  //   nickName: 'eden',
  //   introduction: '사용자가 편하게 이용할 수 있는 소프트웨어를 만들고자하는 개발자입니다! 하루하루 성장하고자 열심히 노력하고 있습니다.',
  //   district: '서울',
  //   githubUrl: 'https://github.com/HongJungKim-dev',
  //   blogUrl: 'https://github.com/HongJungKim-dev',
  // };

  // type profileType = typeof initialProfile;

  // const [profiles, setProfiles] = useState<profileType[]>([]);
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
  const [profile, setProfile] = useState<profileType>({
    memberId: 0,
    profileImageUrl: '',
    nickName: '',
    introduction: '',
    district: '',
    githubLink: '',
    // blogUrl: '',
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isMouseOvered) {
      return;
    }

    const targetIds = hoverIds.map((hoverId) => {
      if (hoverId === id) {
        return hoverId;
      }
      return null;
    });

    // if (targetIds.length > 1) {
    //   console.log(targetIds.length);
    //   setHoverIds([]);
    //   return;
    // }
    const targetProfile = profiles.find((profile) => profile.memberId === id);
    // setTimeout(() => {
    if (!targetProfile) {
      // TODO : api로 부터 profile 얻기
      const getProfile = async () => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        };
        const body = token ? { headers } : {};

        const url = `api/members/${id}/hover-info`;
        try {
          doingLoading();
          const response = await axios.get(`${process.env.END_POINT}${url}`, body);
          doneLoading();
          const { data } = response;
          // const data = {
          //   memberId: 1,
          //   nickName: 'devjun10',
          //   profileImageUrl: 'https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg?lm=1',
          //   introduction: '반갑습니다. 잘부탁드립니다.',
          //   githubLink: 'https://github.com/devjun10',
          //   district: 'BUSAN',
          //   followerCount: 10,
          //   followingCount: 10,
          // };

          const { memberId, nickName, profileImageUrl, introduction, githubLink, district } = data;
          const newProfile = {
            memberId,
            nickName,
            profileImageUrl,
            introduction,
            githubLink,
            district,
          };
          // console.log(profiles);
          setCurrentProfile(newProfile);
          setProfile(newProfile);
          addProfile(newProfile);
          // setProfiles([...profiles, newProfile]);
          // setProfiles([...profiles, newProfile]);
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

      const getIsFollowing = async () => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        };
        const body = token ? { headers } : {};

        const url = `api/members/${id}/friendship/follow-history`;
        try {
          // const response = await axios.get(`${process.env.END_POINT}${url}`, body);
          // const data = response.data;
          const data = {
            followHistory: 'EXIST', // NON_EXIST
          };
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

      getProfile();
    } else {
      setCurrentProfile(targetProfile);
      // setProfiles([...profiles]);
    }
    // }, 1000);
  }, [isMouseOvered, hoverIds]);

  // useEffect(() => {
  //   console.log('profiles==========================================================');
  //   console.log(profiles);
  // }, [profiles]);

  const handleMouse = () => {
    // setProfile(initialProfile);
    // console.log(profiles);

    setHoverIds([...hoverIds, id]);
    // setTimeout(() => {
    handleMouseOver();

    const currentY = ref?.current?.getBoundingClientRect().y;

    const height = ref?.current?.getBoundingClientRect().height;
    if (!currentY) {
      return;
    }
    if (!height) {
      return;
    }
    // setPreviousY([...previousY, currentY]);
    handlePreviousY(currentY);
    setMovedHeight(currentY - height * 2);
    // console.log(currentY, document.body.clientHeight / 2);
    // console.log(currentY < document.body.clientHeight / 2);
    // console.log('console.log(currentY, previousY');
    // console.log(increasingTop);
    // console.log(currentY, previousY);
    if (currentY >= document.body.clientHeight / 2) {
      setIsTop(true);
      // console.log('increase');
      // console.log(document.body.clientHeight / 2, currentY >= document.body.clientHeight / 2);
      // console.log(currentY, previousY, currentY - previousY, currentY - previousY + increasingTop);
      handleIncreasingTop(currentY, true);
      // setIncreasingTop(currentY - previousY + increasingTop);
      // setIncreasingTop(increasingTop + 40);
      // console.log(ref?.current?.getBoundingClientRect());
    } else {
      setIsTop(false);
      handleIncreasingTop(currentY, true);
      // setIncreasingTop(0);
    }
    // }, 1200);
  };

  useEffect(() => {
    // console.log('followlist');
    const currentY = ref?.current?.getBoundingClientRect().y;
    // console.log('currentY');
    // console.log(currentY);
    if (!currentY) {
      return;
    }
    if (currentY < document.body.clientHeight / 2) {
      setSmallGroup([...smallGroup, currentY]);
      const currentSmallGroup = [];
      currentSmallGroup.push(currentY);
      // console.log('test');
      //  console.log(Math.floor(currentSmallGroup[currentSmallGroup.length - 1]));
      handlePreviousY(Math.floor(currentSmallGroup[currentSmallGroup.length - 1]));
    }
  }, []);

  // useEffect(() => {
  //   console.log('bound');
  //   console.log(ref?.current?.getBoundingClientRect());
  //   const currentY = ref?.current?.getBoundingClientRect().y;

  //   const height = ref?.current?.getBoundingClientRect().height;
  //   if (!currentY) {
  //     return;
  //   }
  //   if (!height) {
  //     return;
  //   }

  //   setMovedHeight(currentY - height * 2);
  //   console.log(currentY, document.body.clientHeight / 2);
  //   console.log(currentY < document.body.clientHeight / 2);
  //   console.log('console.log(currentY, previousY');
  //   console.log(increasingTop);
  //   console.log(currentY, previousY);
  //   if (currentY >= document.body.clientHeight / 2) {
  //     setIsTop(true);
  //     console.log('increase');
  //     console.log(currentY, previousY, currentY - previousY, currentY - previousY + increasingTop);
  //     // setIncreasingTop(currentY - previousY + increasingTop);
  //     // setIncreasingTop(increasingTop + 40);
  //     // console.log(ref?.current?.getBoundingClientRect());
  //   } else {
  //     setIsTop(false);
  //     // setIncreasingTop(0);
  //   }
  //   setPreviousY(currentY);
  // }, [ref?.current]);

  // useEffect(() => {
  //   console.log('plx');
  //   console.log(previousY);
  //   console.log(ref?.current?.getBoundingClientRect().y);
  // }, [previousY]);
  const handleClickFollow = () => {
    const follow = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      const data = {
        targetId: id,
      };
      const body = token ? { headers } : {};
      const url = `api/members/following`;
      try {
        const response = await axios.post(`${process.env.END_POINT}${url}`, data, body);
        setIsFollowing(!isFollowing);
        const newFollow = {
          memberId: id,
          nickName,
          profileImageUrl: avatorSrc,
          isFollowing: !isFollowing,
        };
        if (followMode === contents[0]?.path) {
          // updateFollowers(newFollow);
        } else if (followMode === contents[1]?.path) {
          // updateFollowings(newFollow);
        }
        const isMyPage = userInfos.memberId === userMemberId;
        const isFollowingMode = followMode === contents[1]?.path;
        const isFollowerMode = followMode === contents[0]?.path;

        if (isFollowerMode && isMyPage) {
          if (isFollowing) {
            decreaseFollowing(newFollow);
            updateFollowers(newFollow);
          } else {
            increaseFollowing(newFollow);
            updateFollowings(newFollow);
          }
        }

        if (isFollowingMode && isMyPage) {
          if (isFollowing) {
            decreaseFollowing(newFollow);
            updateFollowers(newFollow);
          } else {
            increaseFollowing(newFollow);
            updateFollowings(newFollow);
          }
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          setIsAlertModalVisible(true);
          // navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
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

  const handleClickUserInfo = () => {
    window.location.href = `/${nickName}`;
  };

  return (
    <S.FlexBetween className={className} onMouseOut={handleMouseOut}>
      {/* <S.ProfileCard>
        <S.FlexBetween>
          <Avatar size="medium" />
          <S.FollowButton size="xsmall" handleClick={() => setIsFollowing(!isFollowing)} isFollowing={isFollowing}>
            {isFollowing ? <S.FollowMsg>언팔로우</S.FollowMsg> : <S.FollowMsg>팔로우</S.FollowMsg>}
          </S.FollowButton>
        </S.FlexBetween>
        <S.CustomNickName clamp={1} content="eden" />
        <S.Introducion content="사용자가 편하게 이용할 수 있는 소프트웨어를 만들고자하는 개발자입니다! 하루하루 성장하고자 열심히 노력하고 있습니다." clamp={2} />
        <S.InfoContainer>
          <S.CustomIcon mode="district" color="disabled" />
          <S.Info>서울</S.Info>
        </S.InfoContainer>
        <S.InfoContainer>
          <S.CustomIcon mode="githubUrl" color="disabled" />
          <S.CustomTextButton handleClick={() => window.open('https://github.com/HongJungKim-dev', '_blank')}>깃허브 주소</S.CustomTextButton>
        </S.InfoContainer>
        <S.InfoContainer>
          <S.CustomIcon mode="link" color="disabled" />
          <S.CustomTextButton handleClick={() => window.open('https://github.com/HongJungKim-dev', '_blank')}>블로그 주소</S.CustomTextButton>
        </S.InfoContainer>
      </S.ProfileCard> */}
      <S.FollowerContainer onMouseOver={handleMouse}>
        {/* <S.FollowerContainer> */}
        <div ref={ref}>
          <Avatar size="xsmall" src={avatorSrc} handleClick={handleClickUserInfo} />
        </div>
        <S.Name onClick={handleClickUserInfo}>{nickName}</S.Name>
      </S.FollowerContainer>
      {userInfos.nickName !== nickName && (
        <S.FollowButton size="xsmall" handleClick={handleClickFollow} isFollowing={isFollowing}>
          {isFollowing ? <S.FollowMsg>언팔로우</S.FollowMsg> : <S.FollowMsg>팔로우</S.FollowMsg>}
        </S.FollowButton>
      )}
      {isMouseOvered && (
        <S.ProfileCard isTop={isTop} increasingTop={increasingTop || 0} onMouseOver={handleMouseOver} followsLength={followsLength}>
          <S.FlexBetween>
            <Avatar size="small" src={currentProfile?.profileImageUrl} handleClick={handleClickUserInfo} />
            {userInfos.nickName !== nickName && (
              <S.FollowButton size="xsmall" handleClick={handleClickFollow} isFollowing={isFollowing}>
                {isFollowing ? <S.FollowMsg>언팔로우</S.FollowMsg> : <S.FollowMsg>팔로우</S.FollowMsg>}
              </S.FollowButton>
            )}
          </S.FlexBetween>
          {/* <S.NickName onClick={handleClickUserInfo}>{currentProfile?.nickName}</S.NickName> */}
          <S.CustomNickName handleClick={handleClickUserInfo} clamp={1} content={currentProfile?.nickName} />
          <S.Introducion content={currentProfile?.introduction} clamp={2} />
          {currentProfile?.district && (
            <S.InfoContainer>
              <S.CustomIcon mode="district" color="disabled" />
              <S.Info>{currentProfile?.district}</S.Info>
            </S.InfoContainer>
          )}
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
    </S.FlexBetween>
  );
};

export default FollowList;

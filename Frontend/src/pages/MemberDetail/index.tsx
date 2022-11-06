/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import Layout from '@components/Layout';
import Avatar from '@components/common/Avatar';
import Button from '@components/common/Button';
import Posting from '@components/Posting';
import { useRecoilState } from 'recoil';
import myStudiesState from '@store/MyStudies';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import timeForToday from '@pages/Detail/util';
import userInfosState from '@store/UserInfos';
import { Cookies } from 'react-cookie';
import Divider from '@components/common/Divider';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import FollowList from '@components/FollowList';
import BasicButton from '@components/common/BasicButton';
import useLogOut from '@hooks/useLogout';
import { contents } from '@pages/MemberDetail/constants';
import isAlertModalVisibleState from '@store/AlertModal';
import { user } from './constants';
import { LOGIN_PATH, ETC_PATH, SERVER_ERROR_PATH, STUDY_PATH, MEMBER_DETAIL_PATH } from '../../constants/route';
import * as S from './style';

const MemberDetail = () => {
  const [userInfos] = useRecoilState(userInfosState);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [studies, setStudies] = useRecoilState(myStudiesState);
  const cookies = new Cookies();
  const location = useLocation();
  const [previousY, setPreviousY] = useState(0);
  const [increasingTop, setIncreasingTop] = useState(40); // 34 28 32
  const [userNickName, setUserNickName] = useState('');
  const [userProfileImage, setUserProfileImage] = useState('');
  const [userMemberId, setUserMemberId] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  // const location = useLocation();
  // location.search
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  type CotnentControlsKeyType = 'hasNext';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [followerContentControls, setFollowerContentControls] = useState<CotnentControlsType>();
  const [followingContentControls, setFollowingContentControls] = useState<CotnentControlsType>();
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const { logout } = useLogOut();
  const [followHistory, setFollowHistory] = useState('');
  const [isAlertModalVisible, setIsAlertModalVisible] = useRecoilState(isAlertModalVisibleState);
  const [followMode, setFollowMode] = useState('');
  type followKeyType = 'memberId' | 'profileImageUrl' | 'nickName' | 'isFollowing';
  type followType = Record<followKeyType, any>;
  const [follows, setFollows] = useState<followType[]>([]);
  const [followers, setFollowers] = useState<followType[]>([]);
  const [followings, setFollowings] = useState<followType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLLIElement>(null);
  const followerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!userInfos.memberId) {
      setIsFollowing(false);
      setFollowHistory('NON_EXIST');
    }
  }, [userInfos.memberId]);

  const handleIncreasingTop = (currentY: number, isTop: boolean) => {
    // console.log('increasingTop');
    if (isTop === false) {
      setIncreasingTop(currentY - previousY + 40); // 38
      return;
    }
    // console.log(isTop, currentY, previousY);
    // setIncreasingTop(40);
    setIncreasingTop(currentY - previousY + increasingTop);
  };

  const handlePreviousY = (currentY: number) => {
    // setPreviousY([...previousY, currentY]);
    setPreviousY(currentY);
    // console.log('plz plz');
    // console.log(previousY, currentY);
  };

  // useEffect(() => {
  //   handlePreviousY(391);
  // }, []);

  useEffect(() => {
    if (location.pathname === '/*') {
      // window.location.href = `${ETC_PATH}`;
    }
  }, [location.pathname]);

  useEffect(() => {
    const getStudies = async () => {
      const { memberId } = userInfos;
      const data = {
        memberId,
      };

      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      const body = token ? { data, headers } : { data };

      // const res = await axios.get(`${process.env.END_POINT}api/members/${memberId}/my-studies`, {
      //   data,
      //   headers,
      // });
      const res = await axios.get(`${process.env.END_POINT}api/members/${memberId}/my-studies`, body);
      // res.data.content
      type apiStudiesType = typeof res.data.content[0];
      const apiStudies: apiStudiesType[] = res.data.content;
      // const targetDatas = [
      //   {
      //     id: 1,
      //     title: 'asf참여',
      //     content: 'af',
      //     studyOrganizer: 'devjun10',
      //     studyStatus: 'RECRUITING',
      //     hashTags: [
      //       { studyId: 1, tagName: 'java' },
      //       { studyId: 2, tagName: 'javascript' },
      //     ],
      //     createdAt: '2022-09-08T19:56:13',
      //     startDate: '2022-09-08',
      //     endDate: '2022-09-08',
      //     currentStudyMemberCount: 1,
      //     maxStudyMemberCount: 3,
      //     progressOfStudy: 'ONLINE',
      //     district: 'SEOUL',
      //     commentCount: 0,
      //     viewCount: 1,
      //     likeCount: 0,
      //   },
      // ];

      const currentPostings = apiStudies.map((targetData) => {
        // const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
        //   targetData;
        const { id, title, content, studyOrganizer, studyStatus, progressOfStudy, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate } = targetData;
        // TODO: API
        /**
           *   const { id, title, content, studyOrganizer, studyStatus, processOfStudy, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
          response.content;

          const { nickName } = response;
          50줄 type에서 meeting제거하기
           */
        // eslint-disable-next-line prefer-destructuring
        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;
        const hashTags: tagType[] = targetData;
        // const hashTags = [
        //   { studyId: 1, tagName: 'java' },
        //   { studyId: 2, tagName: 'javascript' },
        // ];
        const tags = hashTags?.map(({ studyId, tagName }) => ({
          id: studyId,
          content: tagName,
        }));

        return {
          id,
          nickName: studyOrganizer,
          title,
          time: timeForToday(createdAt),
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
              content: progressOfStudy,
            },
            {
              id: 3,
              type: 'limit',
              content: `최대 ${maxStudyMemberCount}명`,
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

      setStudies(currentPostings);
    };

    if (userInfos.memberId) {
      // getStudies();
    }
  }, [userInfos.memberId]);

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
        targetId: userMemberId,
      };
      const body = token ? { headers } : {};
      const url = `api/members/following`;
      try {
        const response = await axios.post(`${process.env.END_POINT}${url}`, data, body);
        setFollowHistory(followHistory === 'EXIST' ? 'NON_EXIST' : 'EXIST');
        if (followHistory === 'EXIST') {
          if (followerCount > 0) {
            setFollowerCount(followerCount - 1);
          }
        } else {
          setFollowerCount(followerCount + 1);
        }

        const isFollowingTargetUser = followHistory === 'EXIST';
        if (isFollowingTargetUser) {
          const remainFollowers = followers.filter(({ memberId }) => memberId !== userInfos.memberId);
          setFollowers([...remainFollowers]);
        } else {
          const newFollower = {
            memberId: userInfos.memberId,
            nickName: userInfos.nickName,
            profileImageUrl: userInfos.profileImage,
            isFollowing: true,
          };
          setFollowers([newFollower, ...followers]);
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

  const getUserInfoByNickName = async () => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = cookies.get(`SEC_EKIL15`);
    const headers = {
      Authorization: `Bearer ${token}`,
      RefreshToken: `Bearer ${refreshToken}`,
      'Content-Type': 'application/json',
    };
    const data = {
      // targetId:
    };

    const params = {
      nickName: userNickName,
    };
    const body = token ? { headers, params } : { params };
    const url = `api/members`;
    try {
      const response = await axios.get(`${process.env.END_POINT}${url}`, body);
      setUserProfileImage(response.data.profileImageUrl);
      setFollowerCount(response.data.followerCount);
      setFollowingCount(response.data.followingCount);
      setUserMemberId(response.data.memberId);
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
    if (location.pathname === '/*') {
      // window.location.href = `${ETC_PATH}`;
    }
  }, []);

  // useEffect(() => {
  //   if (!userMemberId && userNickName) {
  //     console.log('hi');
  //     if (!userNickName) {
  //       return;
  //     }

  //     if (userMemberId) {
  //       return;
  //     }
  //     console.log('nick');
  //     console.log(userMemberId, userNickName);
  //     getUserInfoByNickName();
  //   }
  // }, [userNickName]);

  useEffect(() => {
    const getIsFollowing = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      const body = token ? { headers } : {};
      const url = `api/members/${userMemberId}/friendship/follow-history`;
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        setFollowHistory(response.data.followHistory);
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          return;
        }

        if (error.response.status === 404) {
          navigate(`${ETC_PATH}`);
          // window.location.href = `${ETC_PATH}`;
          return;
        }

        if (error.response.status === 500) {
          navigate(`${SERVER_ERROR_PATH}`);
        }
      }
    };

    if (userMemberId && userMemberId !== userInfos.memberId) {
      getIsFollowing();
    }
  }, [userMemberId]);

  const doingLoading = () => {
    setIsLoading(true);
  };

  const doneLoading = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    const handleClickAway = (event: any) => {
      let hasFollow = false;
      let hasFollower = false;
      let hasModal = false;

      if (followRef?.current) {
        hasFollow = followRef.current?.contains(event.target as Node);
      }

      if (followerRef?.current) {
        hasFollower = followerRef.current?.contains(event.target as Node);
      }

      if (modalRef?.current) {
        hasModal = modalRef.current?.contains(event.target as Node);
      }

      // if (!hasButton && !hasModal) {
      //   return;
      // }
      const isViaible = hasFollow || hasFollower || hasModal;
      setIsModalVisible(isViaible);
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  const handleClickCancel = () => {
    setIsModalVisible(false);
  };

  const handleClickFollowOption = (path: string) => {
    setIsModalVisible(true);
    setIncreasingTop(40);
    setFollowMode(path);
    // handleClick();
  };

  const [followersNum, setFollowersNum] = useState(0);
  const [followingsNum, setFollowingsNum] = useState(0);
  const [isFollowingTitle, setIsFollowingTitle] = useState(false);
  const [isTargetUserFollowing, setIsTargetUserFollowing] = useState(false);
  const [isScrollStopped, setIsScrollStopped] = useState(false);
  const [targetUserId, setTargetUserId] = useState('');
  const [hasFollowers, setHasFollowers] = useState(false);
  const [hasFollowings, setHasFollowings] = useState(false);
  type profileKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'introduction' | 'githubLink' | 'district';
  type profileType = Record<profileKeyType, any>;
  const [profiles, setProfiles] = useState<profileType[]>([]);

  const addProfile = (newProfile: profileType) => {
    setProfiles([...profiles, newProfile]);
  };

  useEffect(() => {
    const getFollowers = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      const body = token ? { headers } : {};
      const url = `api/members/${userMemberId}/friendship/follower-list?cursorTarget=0&size=5`;
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        type dataKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'followHistory';
        type dataType = Record<dataKeyType, any>;
        const data: dataType[] = response.data.followerList;
        const followList: number[] = response.data.myFollowList;
        const { hasNext } = response.data;
        // setContentControls({ hasNext });
        setFollowerContentControls({ hasNext });
        setHasFollowers(true);
        const currentData = data.map(({ memberId, nickName, profileImageUrl }) => ({
          memberId,
          nickName,
          profileImageUrl,
          isFollowing: false,
        }));
        const newData = currentData.map((targetData) => {
          // eslint-disable-next-line no-unreachable-loop, no-restricted-syntax
          for (const followerId of followList) {
            if (targetData.memberId === followerId) {
              return {
                memberId: targetData.memberId,
                nickName: targetData.nickName,
                profileImageUrl: targetData.profileImageUrl,
                isFollowing: true,
              };
            }
          }
          return targetData;
        });

        setFollowers(newData);
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

    const getFollowings = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      const body = token ? { headers } : {};

      // userInfos.memberId

      const url = `api/members/${userMemberId}/friendship/following-list?cursorTarget=0&size=5`;
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        type dataKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'followHistory';
        type dataType = Record<dataKeyType, any>;
        const data: dataType[] = response.data.followerList;
        const followList: number[] = response.data.myFollowList;
        const { hasNext } = response.data;
        // setContentControls({ hasNext });
        setFollowingContentControls({ hasNext });
        setHasFollowings(true);
        const currentData = data.map(({ memberId, nickName, profileImageUrl }) => ({
          memberId,
          nickName,
          profileImageUrl,
          isFollowing: false,
        }));

        const newData = currentData.map((targetData) => {
          // eslint-disable-next-line no-unreachable-loop, no-restricted-syntax
          for (const followerId of followList) {
            if (targetData.memberId === followerId) {
              return {
                memberId: targetData.memberId,
                nickName: targetData.nickName,
                profileImageUrl: targetData.profileImageUrl,
                isFollowing: true,
              };
            }
          }
          return targetData;
        });

        setFollowings(newData);
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
    const currentPathname = location?.pathname;

    if (!userMemberId && userNickName) {
      getUserInfoByNickName();
    }

    // TODO : api로 팔로워 혹은 팔로잉 데이터 받아오기, 상태에 값이 없는 경우에만
    if (followMode === contents[0]?.path) {
      setIsFollowingTitle(false);
      // setFollowersNum(data.length);
      // console.log('newData');
      // console.log(newData);
      // setFollows(newData);
      setIsModalVisible(true);
      setContentControls(followerContentControls);
      if (userMemberId) {
        const otherFollowers = followers.filter(({ memberId }) => memberId !== userInfos.memberId);
        if (!hasFollowers) {
          getFollowers();
        }
      }

      setIncreasingTop(40);
      // if (!userMemberId && userNickName) {
      //   console.log('nick1');
      //   getUserInfoByNickName();
      // }
    } else if (followMode === contents[1]?.path) {
      setIsFollowingTitle(true);
      setIsModalVisible(true);
      setContentControls(followingContentControls);
      if (userMemberId) {
        if (!hasFollowings) {
          getFollowings();
        }
      }

      setIncreasingTop(40);
      // if (!userMemberId && userNickName) {
      //   console.log(userMemberId, userNickName);
      //   console.log('nick2');
      //   getUserInfoByNickName();
      // }
    }
  }, [location?.pathname, userNickName, userMemberId, followMode, followingContentControls, followerContentControls]);

  useEffect(() => {
    if (followMode === contents[0]?.path) {
      setFollows([...followers]);
    } else if (followMode === contents[1]?.path) {
      setFollows([...followings]);
    }
  }, [followMode]);

  const updateFollowings = (editedFollowing: followType) => {
    const remainFollowings = followings.filter(({ memberId }) => memberId !== editedFollowing.memberId);
    const newFollowings = [editedFollowing, ...remainFollowings];
    newFollowings.sort((aFollowing, bFollowing) => bFollowing.memberId - aFollowing.memberId);
    setFollowings(newFollowings);

    const targetFollower = followers.find(({ memberId }) => memberId === editedFollowing.memberId);
    const remainFollowers = followers.filter(({ memberId }) => memberId !== editedFollowing.memberId);
    if (targetFollower) {
      const newFollower = {
        memberId: targetFollower?.memberId,
        nickName: targetFollower?.nickName,
        profileImageUrl: targetFollower?.profileImageUrl,
        isFollowing: !targetFollower?.isFollowing,
      };
      const newFollowers = [newFollower, ...remainFollowers];
      newFollowers.sort((aFollowing, bFollowing) => bFollowing.memberId - aFollowing.memberId);
      setFollowers(newFollowers);
    }
  };

  const updateFollowers = (editedFollower: followType) => {
    const remainFollowers = followers.filter(({ memberId }) => memberId !== editedFollower.memberId);
    const newFollowers = [editedFollower, ...remainFollowers];
    newFollowers.sort((aFollower, bFollower) => bFollower.memberId - aFollower.memberId);
    setFollowers(newFollowers);
  };

  useEffect(() => {
    const currentPathname = location?.pathname;
    if (followMode === contents[0]?.path) {
      setFollows(followers);
    } else if (followMode === contents[1]?.path) {
      setFollows(followings);
    }
  }, [location?.pathname, followers, followings]);

  const handleScroll = () => {
    setIsScrollStopped(false);
    setTimeout(() => {
      setIsScrollStopped(true);
      // console.log('scrolling');
    }, 1000);
  };

  useEffect(() => {
    setUserNickName(decodeURI(location?.pathname.split('/')[1]));
  }, []);

  useEffect(() => {
    if (!target) {
      return;
    }

    // if (isCommentLoading) {
    //   return;
    // }
    if (!contentControls || !contentControls?.hasNext) {
      return;
    }
    // TODO : custom hook으로 수정하기
    const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (!target) {
        return;
      }

      if (!contentControls || !contentControls?.hasNext) {
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // if (isCommentLoading) {
          //   return;
          // }

          const addData = async (url: string) => {
            const token = localStorage.getItem('accessToken');
            const refreshToken = cookies.get(`SEC_EKIL15`);
            const headers = {
              Authorization: `Bearer ${token}`,
              RefreshToken: `Bearer ${refreshToken}`,
              'Content-Type': 'application/json',
            };

            const body = token ? { headers } : {};

            try {
              const response = await axios.get(`${process.env.END_POINT}${url}`, body);
              type dataKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'followHistory';
              type dataType = Record<dataKeyType, any>;
              const data: dataType[] = response.data.followerList;
              const followList: number[] = response.data.myFollowList;
              const { hasNext } = response.data;

              if (url.includes('follower')) {
                setFollowerContentControls({ hasNext });
              } else if (url.includes('following')) {
                setFollowingContentControls({ hasNext });
              }
              const currentData = data.map(({ memberId, nickName, profileImageUrl }) => ({
                memberId,
                nickName,
                profileImageUrl,
                isFollowing: false,
              }));
              const newData = currentData.map((targetData) => {
                // eslint-disable-next-line no-unreachable-loop, no-restricted-syntax
                for (const followerId of followList) {
                  if (targetData.memberId === followerId) {
                    return {
                      memberId: targetData.memberId,
                      nickName: targetData.nickName,
                      profileImageUrl: targetData.profileImageUrl,
                      isFollowing: true,
                    };
                  }
                }
                return targetData;
              });
              // setFollows([...follows, ...newData]);
              if (url.includes('follower')) {
                setFollowers([...follows, ...newData]);
                // setFollowerCount(newData.length + followerCount);
              } else if (url.includes('following')) {
                setFollowings([...follows, ...newData]);
                // setFollowingCount(newData.length + followingCount);
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

          const currentPathname = location?.pathname;
          // setIncreasingTop(80);
          // console.log(isTop, currentY, previousY);

          if (followMode === contents[0]?.path) {
            if (followers.length > 0) {
              const nextCursor = followers[followers.length - 1].memberId;
              if (userMemberId) {
                const url = `api/members/${userMemberId}/friendship/follower-list?cursorTarget=${nextCursor}&size=5`;
                addData(url);
              }
            }
          } else if (followMode === contents[1]?.path) {
            if (followings.length > 0) {
              const nextCursor = followings[followings.length - 1].memberId;
              if (userMemberId) {
                const url = `api/members/${userMemberId}/friendship/following-list?cursorTarget=${nextCursor}&size=5`;
                addData(url);
              }
            }
          }
        }
      });
    };
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(target);
    // eslint-disable-next-line consistent-return
    // return () => observer?.unobserve(target);
    // eslint-disable-next-line consistent-return
    return () => observer?.unobserve(target);
  }, [target, contentControls?.hasNext, userMemberId, follows, followers, followings]);

  const increaseFollowing = (targetFollowing: followType) => {
    const newFollowing = {
      memberId: userInfos.memberId,
      nickName: userInfos.nickName,
      profileImageUrl: userInfos.profileImage,
      isFollowing: true,
    };
    const newFollowings = [targetFollowing, ...followings];
    newFollowings.sort((aFollowing, bFollowing) => bFollowing.memberId - aFollowing.memberId);
    // setFollowings(newFollowings);
    setFollowingCount(followingCount + 1);
  };

  const decreaseFollowing = (targetFollowing: followType) => {
    const remainFollowings = followings.filter(({ memberId }) => memberId !== targetFollowing.memberId);
    setFollowings([...remainFollowings]);
    setFollowingCount(followingCount - 1);
  };

  return (
    <Layout>
      <S.Container>
        <S.UserInfos>
          <Avatar src={userProfileImage} alt={`${userNickName} profile image`} size="medium" />
          <S.UserInfoContainer>
            <S.UserInfo>
              <S.User>{userNickName}</S.User>
              {userInfos?.nickName !== userNickName && (
                <S.CustomButton handleClick={handleClickFollow} size="xsmall">
                  {followHistory === 'EXIST' ? '언팔로우' : '팔로우'}
                </S.CustomButton>
              )}
            </S.UserInfo>
            <S.FollowContainer>
              {contents.map(({ id, content, path }) => (
                <S.FollowItem key={`content-${id}`} ref={path === 'following' ? followRef : followerRef}>
                  {/* <S.CustomLink to={`/${userNickName}/${path}/`} onClick={handleClickFollowOption}> */}
                  <div onClick={() => handleClickFollowOption(path)}>
                    <S.FollowContent>{content}</S.FollowContent>
                    <S.FollowContent>{path === 'following' ? followingCount : followerCount}</S.FollowContent>
                  </div>
                  {/* </S.CustomLink> */}
                </S.FollowItem>
              ))}
            </S.FollowContainer>
            {/* <S.ItemContainer>
              {userInfos.map(({ id, content, num }) => (
                <S.Item key={`memberDetail-info-${id}`}>
                  <S.Infos>
                    {content} {num}
                  </S.Infos>
                </S.Item>
              ))}
            </S.ItemContainer> */}
          </S.UserInfoContainer>
        </S.UserInfos>
        {/* <S.Category>참여한 스터디</S.Category>
        <S.HorizontalDivider direction="horizontal" />
        <S.PostingContainer>
          {studies.map(({ id, nickName, time, title, infos, viewCount, likeCount, commentCount, isRecruiting, content, tags }) => (
            <S.LinkContainer>
              <S.CustomLink to={`${STUDY_PATH}/${id}`}>
                <S.PostingItem key={`meberDetail-posting-${id}`}>
                  <Posting
                    nickName={nickName}
                    time={time}
                    title={title}
                    infos={infos}
                    viewCount={viewCount}
                    likeCount={likeCount}
                    commentCount={commentCount}
                    isRecruiting={isRecruiting}
                    content={content}
                    tags={tags}
                  />
                </S.PostingItem>
              </S.CustomLink>
              <S.HorizontalDivider direction="horizontal" />
            </S.LinkContainer>
          ))}
        </S.PostingContainer> */}
      </S.Container>
      <Portal>
        {isModalVisible && (
          <Modal ref={modalRef}>
            <S.FollowerWrapper>
              <S.FollowerTitleArea>
                <S.FlexCenter>
                  {/* <S.Flex> */}
                  <S.FollowerTitle>{isFollowingTitle ? '팔로우' : '팔로워'}</S.FollowerTitle>
                  {/* </S.Flex> */}
                  <div style={{ float: 'right', margin: '0 8px 0 0' }}>
                    <S.FollowCancelButton handleClick={handleClickCancel}>
                      <S.FollowCancelIcon mode="delete" />
                    </S.FollowCancelButton>
                  </div>
                </S.FlexCenter>
              </S.FollowerTitleArea>
              <Divider direction="horizontal" />
              <S.FollowerListContainer onScroll={handleScroll}>
                {follows.map(({ memberId, profileImageUrl, nickName, isFollowing }) => (
                  <S.FollowerContent key={`followerList-${memberId}`}>
                    {/* <S.FlexBetween>
                      <S.FollowerContainer>
                        <Avatar size="xsmall" src={avatorSrc} />
                        <S.Name>{nickName}</S.Name>
                      </S.FollowerContainer>
                      <S.FollowButton size="xsmall" handleClick={() => setIsFollowing(!isFollowing)} isFollowing={isFollowing}>
                        {isFollowing ? <S.FollowMsg>언팔로우</S.FollowMsg> : <S.FollowMsg>팔로우</S.FollowMsg>}
                      </S.FollowButton>
                    </S.FlexBetween> */}
                    <FollowList
                      id={memberId}
                      avatorSrc={profileImageUrl}
                      nickName={nickName}
                      previousY={previousY}
                      handlePreviousY={handlePreviousY}
                      increasingTop={increasingTop}
                      handleIncreasingTop={handleIncreasingTop}
                      isScrollStopped={isScrollStopped}
                      initialIsFollowing={isFollowing}
                      followsLength={follows.length}
                      userMemberId={userMemberId}
                      increaseFollowing={increaseFollowing}
                      decreaseFollowing={decreaseFollowing}
                      addProfile={addProfile}
                      profiles={profiles}
                      isLoading={isLoading}
                      doingLoading={doingLoading}
                      doneLoading={doneLoading}
                      followMode={followMode}
                      updateFollowings={updateFollowings}
                      updateFollowers={updateFollowers}
                    />
                  </S.FollowerContent>
                ))}
                <div ref={setTarget} />
              </S.FollowerListContainer>
            </S.FollowerWrapper>
          </Modal>
        )}
      </Portal>
    </Layout>
  );
};

export default MemberDetail;

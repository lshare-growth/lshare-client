/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import Layout from '@components/Layout';
import Avatar from '@components/common/Avatar';
import axios from 'axios';
import useLogOut from '@hooks/useLogout';
import { useLocation, useNavigate } from 'react-router-dom';
import userInfosState from '@store/UserInfos';
import { useRecoilState } from 'recoil';
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import Items from '@components/DropDown/types';
import dropDownItemState from '@store/DropDownItem';
import { Cookies } from 'react-cookie';
import { encrypt, getHeaders } from '@pages/util';
import showingInputValueState from '@store/ShowingInputValue';
import LoadingSpinner from '@components/common/LoadingSpinner';
import Portal from '@components/Modal/Portal';
import Modal from '@components/Modal';
import AlertModalArea from '@components/Modal/AlertModalArea';
import { ProgressContainer, ProgressBar } from '@components/Header/style';
import * as S from './style';
import { FORBIDDEN_PATH, ETC_PATH, LOGIN_PATH, MAIN_PATH, SERVER_ERROR_PATH } from '../../constants/route';

const MAX_BLOG_LENGTH = 60;

const MemberEdit = () => {
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const [districts, setDistricts] = useState<Items[]>();
  const [originDistricts, setOriginDistricts] = useState<Items[]>();
  // eslint-disable-next-line no-unused-vars
  const [introduce, setIntroduce] = useState('');
  const [blog, setBlog] = useState('');
  const [birth, setBirth] = useState('');
  const [nickName, setNickName] = useState('');
  const [isDuplicatedNickName, setIsDuplicatedNickName] = useState(false);
  const [isCheckDuplication, setIsCheckDuplication] = useState(false);
  const [nickNameMsg, setNickNameMsg] = useState('');
  const [blankMsg, setBlankMsg] = useState('');
  const [emptyCaseMsg, setEmptyCaseMsg] = useState('');
  const [birthMsg, setBirthMsg] = useState('');
  const [blogMsg, setBlogMsg] = useState('????????? ?????? ??????????????? 35???????????????.');
  const [overBirthMsg, setOverBirthMsg] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [dropDownItem, setDropDownItem] = useRecoilState(dropDownItemState);
  type dataKeyType = 'memberId' | 'blogUrl' | 'birthDate' | 'district';
  type dataType = Record<dataKeyType, any>;
  const { logout } = useLogOut();
  const cookies = new Cookies();
  const [showingInputValue, setShowingInputValue] = useRecoilState(showingInputValueState);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorizedPage, setIsAuthorizedPage] = useState(false);
  const [currentNickName, setCurrentNickName] = useState('');
  const [currentBirth, setCurrentBirth] = useState('');
  const [currentIntroduction, setCurrentIntroduction] = useState('');
  const [currentBlogUrl, setCurrentBlogUrl] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProfileUrl, setCurrentProfileUrl] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState('');
  const [correctMsg, setCorrectMsg] = useState('');

  const DEFAUlT_SELECT = '??????';
  const DELIMITER_NUM = 2;
  const location = useLocation();

  useEffect(() => {
    const hasBlank = / /gi.test(nickName) === true;
    if (hasBlank) {
      setBlankMsg('????????? ?????? ??????????????????.');
    }
  }, [nickName]);

  const handleClickEditNickName = () => {
    if (nickName.length === 0) {
      setEmptyCaseMsg('???????????? ??????????????????.');
      return;
    }
    if (!isCheckDuplication) {
      setNickNameMsg('??????????????? ?????????????????????.');
      return;
    }
    if (isDuplicatedNickName) {
      setNickNameMsg('????????? ?????????????????????.');
      return;
    }
    const updateNickName = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const nickNameExeptedSpace = nickName.trim().replace(/ /gi, '');
      const data = {
        nickName: nickNameExeptedSpace,
      };
      const body = token ? { headers } : {};
      try {
        const response = await axios.put(`${process.env.END_POINT}api/members/my-profile/nickName`, data, body);

        const encodedNickName = encrypt(nickNameExeptedSpace, `${process.env.SECURE_IDENTIFI_KEY}`);

        setUserInfos({
          memberId: userInfos.memberId,
          nickName: nickNameExeptedSpace,
          notification: userInfos.notification,
          profileImage: userInfos.profileImage,
        });
        cookies.set(`SEC_3BKIF3`, encodedNickName, {
          path: '/',
        });
        setNickNameMsg('?????????????????????.');
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          setNickNameMsg('????????? ?????????????????????.');
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
    updateNickName();
  };

  const handleClickCheckIsExistNickName = () => {
    if (nickName.length === 0) {
      setEmptyCaseMsg('???????????? ??????????????????.');
      return;
    }

    const checkIsExistNickName = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const body = token ? { params: { nickName }, headers } : { params: { nickName } };
      try {
        // eslint-disable-next-line no-unused-vars
        const url = `${process.env.END_POINT}api/members/duplicated-nickName`;
        const response = await axios.get(`${process.env.END_POINT}api/members/duplicated-nickName`, body);

        setIsDuplicatedNickName(response.data.nickNameExistence);
        setIsCheckDuplication(true);
        const isDuplicatedName = response.data.nickNameExistence;
        setNickNameMsg(isDuplicatedName ? '????????? ??????????????????.' : '??????????????? ??????????????????');
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

    const hasBlank = / /gi.test(nickName) === true;
    if (hasBlank) {
      setBlankMsg('????????? ?????? ??????????????????.');
      return;
    }

    checkIsExistNickName();
  };

  const handleClickEdit = () => {
    const isRightBirthLength = birth.length < 8 + DELIMITER_NUM;
    if (showingInputValue.length > 0 && showingInputValue.length < 8 + DELIMITER_NUM) {
      setBirthMsg('??????????????? 8?????? ?????????.');
      return;
    }

    const targetDistricts = dropDownItem.find((item) => item.type === 'district');
    const districtData = districts?.find((currentDistrict) => currentDistrict.content === targetDistricts?.content);

    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).getTime();
    const birthYear = Number(birth.split('-')[0]);
    const birthMonth = Number(birth.split('-')[1]);
    const birthDate = Number(birth.split('-')[2]);
    const birthDay = new Date(birthYear, birthMonth, birthDate).getTime();
    if (yesterday < birthDay) {
      setOverBirthMsg('??????????????? ??????????????????.');
      return;
    }
    if (birth.length < 1 && blog.length === 0 && introduce.length === 0 && !districtData) {
      return;
    }
    if (blog.length > MAX_BLOG_LENGTH) {
      return;
    }
    const updateProfile = async (data: any) => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      try {
        const body = token ? { headers } : {};
        const response = await axios.put(`${process.env.END_POINT}api/members/my-profile`, data, body);
        setIsModalVisible(true);
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          return;
        }

        if (error.response.status === 400) {
          setIsModalVisible(true);
          setCorrectMsg(() => '??????????????? ??????????????????');
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

    const currentDistrictData = districtData?.content === DEFAUlT_SELECT ? '' : districtData;
    const data = {
      memberId: userInfos.memberId,
      blogUrl: blog || currentBlogUrl,
      birthDate: showingInputValue || currentBirth,
      district: currentDistrictData ? currentDistrictData?.type : districts && districts[0]?.type,
      introduction: introduce || currentIntroduction,
    };

    updateProfile(data);
  };

  const handleClickCancel = () => {
    navigate(`${MAIN_PATH}`);
  };

  useEffect(() => {
    const getDistricts = async () => {
      const DISTRICT_URL = 'api/study-supports/districts';
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();
        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.get(`${process.env.END_POINT}${DISTRICT_URL}`, body);
        type apiDistrictKeyType = 'id' | 'type' | 'value';
        type apiDistrictType = Record<apiDistrictKeyType, any>;
        const apiDistricts: apiDistrictType[] = response.data.districts;
        const districtsValues = apiDistricts.map(({ id, type, value }) => ({
          id,
          type,
          content: value,
        }));
        const showingDistrictsValues = districtsValues.filter(({ type }) => type !== '');
        const noneDistrict = districtsValues.find(({ type }) => type === '');
        const newDistricts = [
          {
            id: noneDistrict?.id,
            type: 'NONE',
            content: DEFAUlT_SELECT,
          },
          ...showingDistrictsValues,
        ];
        setDistricts(newDistricts);
        setOriginDistricts(newDistricts);
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
    getDistricts();
  }, []);

  const handleChangeIntroduce = (event: ChangeEvent<HTMLInputElement>) => {
    setIntroduce(event.target.value);
  };

  const handleChangeBlog = (event: ChangeEvent<HTMLInputElement>) => {
    setBlog(event.target.value);
  };

  const handleChangeBirth = (event: ChangeEvent<HTMLInputElement>) => {
    setBirth(event.target.value);
  };

  const handleChangeNickName = (event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  useEffect(() => {
    setCurrentNickName(userInfos?.nickName);
  }, [userInfos?.nickName]);

  useEffect(() => {
    setBlogMsg(`????????? ?????? ??????????????? ${MAX_BLOG_LENGTH}???????????????.`);
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        const body = token ? { headers } : {};

        const url = `api/members/my-profile`;
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);

        // TODO : koreanDistrict DETAIL??? ????????????
        type koreanDistrictsKeyType = 'SEOUL' | 'BUSAN' | 'DAEGU' | 'INCHEON' | 'DAEJEON' | 'ULSAN';
        type koreanDistrictsType = Record<koreanDistrictsKeyType, string>;
        const { nickName, memberProfileImageUrl, introduction, blogUrl, birthDate } = response.data;
        const district: koreanDistrictsKeyType = response.data.district;
        setCurrentProfileUrl(memberProfileImageUrl || '');
        setCurrentIntroduction(introduction || '');
        setCurrentBlogUrl(blogUrl || '');
        setCurrentBirth(birthDate || '');
        setCurrentNickName(nickName || '');

        const koreanDistricts: koreanDistrictsType = {
          SEOUL: '??????',
          BUSAN: '??????',
          DAEGU: '??????',
          INCHEON: '??????',
          DAEJEON: '??????',
          ULSAN: '??????',
        };
        setCurrentDistrict((district && koreanDistricts[district]) || '');
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
  }, []);

  const handleClickCancelModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!currentDistrict || !districts) {
      return;
    }
    const targetDistrict = originDistricts?.find(({ content }) => content === currentDistrict);
    const remainDistricts = districts?.filter(({ content }) => content !== currentDistrict);
    if (districts && targetDistrict) {
      setDistricts([targetDistrict, ...remainDistricts]);
    }
  }, [currentDistrict, originDistricts]);

  useEffect(() => {
    if (!isModalVisible) {
      return;
    }
    setTimeout(() => {
      setIsModalVisible(false);
      if (correctMsg) {
        setCorrectMsg('');
      }
    }, 2500);
  }, [isModalVisible]);

  return (
    <Layout>
      {isLoading ? (
        <S.LoadingContainer>
          <LoadingSpinner size="large" />
        </S.LoadingContainer>
      ) : (
        <S.Container>
          <S.Title>????????????</S.Title>
          <S.HorizontalDivider direction="horizontal" />
          <S.FlexBox>
            <Avatar size="large" src={userInfos.profileImage} alt="profile-image" />
            <S.UserInfos>
              <S.UserInfoArea />
            </S.UserInfos>
          </S.FlexBox>
          <S.BetweenBox>
            <div style={{ padding: '32px 0 0 0' }}>
              <S.Label>??????</S.Label>
              <S.CustomDropDown width="77px" height="48px" type="district" selectTitle={(districts && districts[0]?.content) || '??????'} options={districts || []} />
            </div>
            <S.BirthContainer>
              <S.BirthLabel>????????????</S.BirthLabel>
              <S.CustomInput id="memberEdit-date" placeholder={currentBirth || 'YYYYMMDD'} size="xsmall" mode="calendar" label="" isLabelHorizontal={false} handleChangeValue={handleChangeBirth} />
              {birth.length > 0 && birth.length < 8 + DELIMITER_NUM && <S.NickNameMsg isDuplicated={isDuplicatedNickName}>{birthMsg}</S.NickNameMsg>}
              {showingInputValue.length === 8 + DELIMITER_NUM && overBirthMsg && <S.NickNameMsg>{overBirthMsg}</S.NickNameMsg>}
            </S.BirthContainer>
          </S.BetweenBox>
          <S.NickNameLabel>?????????</S.NickNameLabel>
          <S.UserInfoContainer>
            <S.NickNameInput label="" size="small" id="editedNickName" placeholder={currentNickName} handleChangeValue={handleChangeNickName} isLabelHorizontal />
            <div>
              <S.CustomButton handleClick={handleClickCheckIsExistNickName} size="small">
                ????????????
              </S.CustomButton>
              <S.CustomButton handleClick={handleClickEditNickName} size="small">
                ??????
              </S.CustomButton>
            </div>
          </S.UserInfoContainer>
          {nickName.length === 0 && <S.NickNameMsg isDuplicated={isDuplicatedNickName}>{emptyCaseMsg}</S.NickNameMsg>}
          {nickName.length > 0 && <S.NickNameMsg isDuplicated={isDuplicatedNickName}>{nickNameMsg}</S.NickNameMsg>}
          {/ /gi.test(nickName) && <S.NickNameMsg>{blankMsg}</S.NickNameMsg>}
          <S.CustomInput label="??? ??? ??????" size="medium" id="introduce" placeholder={currentIntroduction || '??? ??? ????????? ??????????????????!'} handleChangeValue={handleChangeIntroduce} />
          <S.CustomInput label="?????????" size="medium" id="blog" placeholder={currentBlogUrl || 'https://lnshare-study.com'} handleChangeValue={handleChangeBlog} />
          {blog.length > MAX_BLOG_LENGTH && <S.NickNameMsg>{blogMsg}</S.NickNameMsg>}
          <S.BetweenBox>
            <S.CancelButton size="large" handleClick={handleClickCancel}>
              ??????
            </S.CancelButton>
            <S.EditButton mode="accent" size="large" handleClick={handleClickEdit}>
              ??????
            </S.EditButton>
          </S.BetweenBox>
        </S.Container>
      )}
      <Portal>
        {isModalVisible && (
          <Modal position="right" ref={modalRef}>
            <AlertModalArea size="small" handleClickCancel={handleClickCancelModal}>
              {correctMsg || '?????????????????????.'}
            </AlertModalArea>
            <ProgressContainer>
              <ProgressBar />
            </ProgressContainer>
          </Modal>
        )}
      </Portal>
    </Layout>
  );
};

export default MemberEdit;

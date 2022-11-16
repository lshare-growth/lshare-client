/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// import AuthorizedLayout from '@components/AuthorizedLayout';
import Layout from '@components/Layout';
import Avatar from '@components/common/Avatar';
import axios from 'axios';
import useLogOut from '@hooks/useLogout';
import { useLocation, useNavigate } from 'react-router-dom';
import userInfosState from '@store/UserInfos';
import { useRecoilState } from 'recoil';
// import DropDown from '@components/DropDown';
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import Items from '@components/DropDown/types';
import dropDownItemState from '@store/DropDownItem';
// import Button from '@common/Button';
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
  // const handleError = () => {};
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
  const [blogMsg, setBlogMsg] = useState('블로그 링크 최대길이는 35글자입니다.');
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
  // const [currentProfileImage, setProfileImage] = useState('');
  // const [currentDistrict, setCurrentDistrict] = useState('');
  const [currentBirth, setCurrentBirth] = useState('');
  const [currentIntroduction, setCurrentIntroduction] = useState('');
  const [currentBlogUrl, setCurrentBlogUrl] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProfileUrl, setCurrentProfileUrl] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState('');
  const [correctMsg, setCorrectMsg] = useState('');

  const DEFAUlT_SELECT = '선택';
  const DELIMITER_NUM = 2;
  const location = useLocation();

  useEffect(() => {
    const hasBlank = / /gi.test(nickName) === true;
    if (hasBlank) {
      setBlankMsg('공백은 입력 불가능합니다.');
    }
  }, [nickName]);

  const handleClickEditNickName = () => {
    if (nickName.length === 0) {
      setEmptyCaseMsg('닉네임을 입력해주세요.');
      return;
    }
    if (!isCheckDuplication) {
      setNickNameMsg('중복체크를 진행하여주세요.');
      return;
    }
    if (isDuplicatedNickName) {
      setNickNameMsg('중복을 확인하여주세요.');
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
        setNickNameMsg('수정되었습니다.');
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          setNickNameMsg('수정에 실패하였습니다.');
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
      setEmptyCaseMsg('닉네임을 입력해주세요.');
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
        // const response = await axios({
        //   method: 'get',
        //   url,
        //   params: { nickName },
        //   headers,
        // });
        setIsDuplicatedNickName(response.data.nickNameExistence);
        setIsCheckDuplication(true);
        const isDuplicatedName = response.data.nickNameExistence;
        setNickNameMsg(isDuplicatedName ? '중복된 닉네임입니다.' : '사용가능한 닉네임입니다');
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
      setBlankMsg('공백은 입력 불가능합니다.');
      return;
    }
    // setNickNameMsg(isDuplicatedName ? '중복된 닉네임입니다.' : '사용가능한 닉네임입니다');
    checkIsExistNickName();
  };

  const handleClickEdit = () => {
    const isRightBirthLength = birth.length < 8 + DELIMITER_NUM;
    if (showingInputValue.length > 0 && showingInputValue.length < 8 + DELIMITER_NUM) {
      setBirthMsg('생년월일은 8글자 입니다.');
      return;
    }

    // if (!targetDistricts) {
    //   targetDistricts = {
    //     id: 1,
    //     type: 'district',
    //     content: '서울',
    //   };
    // }

    // if (!targetDistricts) {
    //   targetDistricts = {
    //     id: 1,
    //     type: 'district',
    //     content: '서울',
    //   };
    // }

    const targetDistricts = dropDownItem.find((item) => item.type === 'district');
    const districtData = districts?.find((currentDistrict) => currentDistrict.content === targetDistricts?.content);

    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).getTime();
    const birthYear = Number(birth.split('-')[0]);
    const birthMonth = Number(birth.split('-')[1]);
    const birthDate = Number(birth.split('-')[2]);
    const birthDay = new Date(birthYear, birthMonth, birthDate).getTime();
    if (yesterday < birthDay) {
      setOverBirthMsg('생년월일을 확인해주세요.');
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
          setCorrectMsg(() => '올바른값을 입력해주세요');
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

    // if (!districtData) {
    //   return;
    // }
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
    // 접근 권한 api요청
    const investigateAuthorization = async () => {
      const token = localStorage.getItem('accessToken');

      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const body = token
        ? {
            headers,
          }
        : {};
      try {
        const targetPathName = location.pathname;
        const response = await axios.get(`${process.env.END_POINT}${targetPathName}`, body);
        setIsLoading(false);
        if (response.status === 200) {
          // setIsAuthorizedPage(true);
        }
      } catch (error: any) {
        setIsLoading(false);
        // setIsAuthorizedPage(false);
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          return;
        }

        if (error.response.status === 403) {
          navigate(`${FORBIDDEN_PATH}`);
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

    // setIsLoading(true);

    // investigateAuthorization();
  }, []);

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
    setBlogMsg(`블로그 링크 최대길이는 ${MAX_BLOG_LENGTH}글자입니다.`);
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        // const body = token ? { headers, withCredentials: true } : { withCredentials: true };
        const body = token ? { headers } : {};

        const url = `api/members/my-profile`;
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);

        // TODO : koreanDistrict DETAIL과 중복제거
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
          SEOUL: '서울',
          BUSAN: '부산',
          DAEGU: '대구',
          INCHEON: '인천',
          DAEJEON: '대전',
          ULSAN: '울산',
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
    // <AuthorizedLayout url={`${process.env.END_POINT}member/update-profile`}>
    <Layout>
      {isLoading ? (
        <S.LoadingContainer>
          <LoadingSpinner size="large" />
        </S.LoadingContainer>
      ) : (
        <S.Container>
          <S.Title>회원수정</S.Title>
          <S.HorizontalDivider direction="horizontal" />
          <S.FlexBox>
            <Avatar size="large" src={userInfos.profileImage} alt="profile-image" />
            <S.UserInfos>
              <S.UserInfoArea />
            </S.UserInfos>
          </S.FlexBox>
          <S.BetweenBox>
            <div style={{ padding: '32px 0 0 0' }}>
              <S.Label>지역</S.Label>
              <S.CustomDropDown width="77px" height="48px" type="district" selectTitle={(districts && districts[0]?.content) || '선택'} options={districts || []} />
            </div>
            <S.BirthContainer>
              {/* <S.CustomInput label="생년월일" size="xsmall" id="birth" placeholder="YYYYMMDD" handleChangeValue={handleChangeBirth} /> */}
              <S.BirthLabel>생년월일</S.BirthLabel>
              <S.CustomInput
                id="memberEdit-date"
                placeholder={currentBirth || 'YYYYMMDD'}
                size="xsmall"
                mode="calendar"
                label=""
                isLabelHorizontal={false}
                // handleClickDate={handleClickDate}
                // handleClickReset={handleClickReset}
                handleChangeValue={handleChangeBirth}
              />
              {/* <S.Msg>-없이 입력해주세요</S.Msg> */}
              {birth.length > 0 && birth.length < 8 + DELIMITER_NUM && <S.NickNameMsg isDuplicated={isDuplicatedNickName}>{birthMsg}</S.NickNameMsg>}
              {showingInputValue.length === 8 + DELIMITER_NUM && overBirthMsg && <S.NickNameMsg>{overBirthMsg}</S.NickNameMsg>}
            </S.BirthContainer>
          </S.BetweenBox>
          <S.NickNameLabel>닉네임</S.NickNameLabel>
          <S.UserInfoContainer>
            <S.NickNameInput label="" size="small" id="editedNickName" placeholder={currentNickName} handleChangeValue={handleChangeNickName} isLabelHorizontal />
            <div>
              <S.CustomButton handleClick={handleClickCheckIsExistNickName} size="small">
                중복체크
              </S.CustomButton>
              <S.CustomButton handleClick={handleClickEditNickName} size="small">
                변경
              </S.CustomButton>
            </div>
          </S.UserInfoContainer>
          {nickName.length === 0 && <S.NickNameMsg isDuplicated={isDuplicatedNickName}>{emptyCaseMsg}</S.NickNameMsg>}
          {nickName.length > 0 && <S.NickNameMsg isDuplicated={isDuplicatedNickName}>{nickNameMsg}</S.NickNameMsg>}
          {/ /gi.test(nickName) && <S.NickNameMsg>{blankMsg}</S.NickNameMsg>}
          <S.CustomInput label="한 줄 소개" size="medium" id="introduce" placeholder={currentIntroduction || '한 줄 소개를 작성해보세요!'} handleChangeValue={handleChangeIntroduce} />
          <S.CustomInput label="블로그" size="medium" id="blog" placeholder={currentBlogUrl || 'https://lnshare-study.com'} handleChangeValue={handleChangeBlog} />
          {blog.length > MAX_BLOG_LENGTH && <S.NickNameMsg>{blogMsg}</S.NickNameMsg>}
          <S.BetweenBox>
            <S.CancelButton size="large" handleClick={handleClickCancel}>
              취소
            </S.CancelButton>
            <S.EditButton mode="accent" size="large" handleClick={handleClickEdit}>
              수정
            </S.EditButton>
          </S.BetweenBox>
        </S.Container>
      )}
      <Portal>
        {isModalVisible && (
          <Modal position="right" ref={modalRef}>
            <AlertModalArea size="small" handleClickCancel={handleClickCancelModal}>
              {correctMsg || '수정되었습니다.'}
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

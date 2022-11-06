/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from '@pages/Loading';
import ServerError from '@pages/ServerError';
import { useRecoilState } from 'recoil';
import userInfosState from '@store/UserInfos';
import { useEffect } from 'react';
import Login from '@pages/Login';
import AuthorizedLayout from '@components/AuthorizedLayout';
import { Cookies } from 'react-cookie';
import { decrypt } from '@pages/util';
import useLogOut from '@hooks/useLogout';
import Forbidden from '@pages/Forbidden';
import loginInfoState from '@store/LoginInfo';
import AuthorizedNewLayout from '@components/AuthorizedNewLayout';
import {
  TAG_SEARCHING_PATH,
  SEARCHING_PATH,
  MEMBER_EDIT_PATH,
  UPDATE_PATH,
  STUDY_PATH,
  LANDING_PATH,
  MAIN_PATH,
  SIGN_UP_PATH,
  NEW_STUDY_PATH,
  MEMBER_DETAIL_PATH,
  MEMBER_MANAGE_PATH,
  // STUDY_MANAGE_PATH,
  LOAD_PATH,
  ETC_PATH,
  SERVER_ERROR_PATH,
  LOGIN_PATH,
  INTRODUCE_PATH,
  INTRODUCE_DETAIL_PATH,
  FORBIDDEN_PATH,
} from './constants/route';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Initial from './pages/Initial';
import Main from './pages/Main';
import MemberDetail from './pages/MemberDetail';
import MemberEdit from './pages/MemberEdit';
import MemberManage from './pages/MemberManage';
import SignUp from './pages/SignUp';
import Write from './pages/Write';
// import StudyManage from './pages/StudyManage';
import About from './pages/About';
import AboutDetail from './pages/AboutDetail';
import NotFound from './pages/NotFound';

const App = () => (
  // const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  // const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  // const cookies = new Cookies();
  // const { logout } = useLogOut();

  // useEffect(() => {
  //   if (!loginInfo || loginInfo === 'false') {
  //     logout();
  //     return;
  //   }

  //   if (!userInfos?.memberId) {
  //     const encodedMemberId = cookies.get(`SEC_MITO78`);
  //     const encodedNickName = cookies.get(`SEC_3BKIF3`);
  //     const encodedNotificationRead = cookies.get(`SEC_1RATI5`);
  //     const encodedProfileImage = cookies.get(`SEC_DMIF22`);

  //     if (encodedMemberId && encodedNickName && encodedNotificationRead && encodedProfileImage) {
  //       const memberId = decrypt(encodedMemberId, `${process.env.SECURE_ID_KEY}`);
  //       const nickName = decrypt(encodedNickName, `${process.env.SECURE_IDENTIFI_KEY}`);
  //       const notificationRead = decrypt(encodedNotificationRead, `${process.env.SECURE_ALARM_KEY}`);
  //       const profileImage = decrypt(encodedProfileImage, `${process.env.SECURE_PROFILE_KEY}`);

  //       const currentUserInfos = {
  //         memberId: Number(memberId),
  //         nickName,
  //         notification: notificationRead !== 'false',
  //         profileImage,
  //       };

  //       setUserInfos(currentUserInfos);
  //     }
  //   }
  // }, [loginInfo]);

  <BrowserRouter>
    <Routes>
      <Route path={INTRODUCE_PATH} element={<About />} />
      <Route path={`${INTRODUCE_DETAIL_PATH}/:id`} element={<AboutDetail />} />
      <Route path={LANDING_PATH} element={<Initial />} />
      <Route path={`${MAIN_PATH}`} element={<Main />} />
      <Route path={`${TAG_SEARCHING_PATH}`} element={<Main />} />
      <Route path={`${SEARCHING_PATH}`} element={<Main />} />
      <Route path={`${STUDY_PATH}/:id`} element={<Detail />} />
      <Route path={SIGN_UP_PATH} element={<SignUp />} />
      <Route
        path={`${NEW_STUDY_PATH}`}
        element={
          <AuthorizedLayout url={NEW_STUDY_PATH.slice(1)}>
            <Write />
          </AuthorizedLayout>
        }
      />
      {/* <Route path={`${NEW_STUDY_PATH}`} element={<Write />} /> */}
      <Route path={LOGIN_PATH} element={<Login />} />
      {/* <Route path={`${UPDATE_PATH}`} element={<Edit />} /> */}
      <Route
        path={`${UPDATE_PATH}`}
        element={
          <AuthorizedLayout url={UPDATE_PATH.slice(1)}>
            <Edit />
          </AuthorizedLayout>
        }
      />
      {/* <Route
        path={MEMBER_EDIT_PATH}
        element={
          <AuthorizedLayout url={MEMBER_EDIT_PATH.slice(1)}>
            <MemberEdit />
          </AuthorizedLayout>
        }
      /> */}
      <Route path={MEMBER_EDIT_PATH} element={<MemberEdit />} />
      <Route path={ETC_PATH} element={<NotFound />} />
      <Route path={`${MEMBER_DETAIL_PATH}`} element={<MemberDetail />} />
      {/* <Route path={`${MEMBER_DETAIL_PATH}/followers/`} element={<MemberDetail />} />
      <Route path={`${MEMBER_DETAIL_PATH}/following/`} element={<MemberDetail />} /> */}
      <Route path={MEMBER_MANAGE_PATH} element={<MemberManage />} />
      {/* <Route path={STUDY_MANAGE_PATH} element={<StudyManage />} /> */}
      <Route path={LOAD_PATH} element={<Loading />} />
      <Route path={FORBIDDEN_PATH} element={<Forbidden />} />
      <Route path={SERVER_ERROR_PATH} element={<ServerError />} />
    </Routes>
  </BrowserRouter>
);
export default App;

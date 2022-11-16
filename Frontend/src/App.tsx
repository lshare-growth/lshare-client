/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from '@pages/Loading';
import ServerError from '@pages/ServerError';
import Login from '@pages/Login';
import AuthorizedLayout from '@components/AuthorizedLayout';
import Forbidden from '@pages/Forbidden';
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
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route
        path={`${UPDATE_PATH}`}
        element={
          <AuthorizedLayout url={UPDATE_PATH.slice(1)}>
            <Edit />
          </AuthorizedLayout>
        }
      />
      <Route
        path={MEMBER_EDIT_PATH}
        element={
          <AuthorizedLayout url={MEMBER_EDIT_PATH.slice(1)}>
            <MemberEdit />
          </AuthorizedLayout>
        }
      />
      <Route path={ETC_PATH} element={<NotFound />} />
      <Route path={`${MEMBER_DETAIL_PATH}`} element={<MemberDetail />} />
      <Route path={MEMBER_MANAGE_PATH} element={<MemberManage />} />
      {/* <Route path={STUDY_MANAGE_PATH} element={<StudyManage />} /> */}
      <Route path={LOAD_PATH} element={<Loading />} />
      <Route path={FORBIDDEN_PATH} element={<Forbidden />} />
      <Route path={SERVER_ERROR_PATH} element={<ServerError />} />
    </Routes>
  </BrowserRouter>
);
export default App;

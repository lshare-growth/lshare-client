import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from '@pages/Loading';
import { INIT_PATH, MAIN_PATH, SIGN_UP_PATH, WRITE_PATH, MEMBER_DETAIL_PATH, MEMBER_MANAGE_PATH, STUDY_MANAGE_PATH, LOAD_PATH, ETC_PATH } from './constants/route';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Initial from './pages/Initial';
import Main from './pages/Main';
import MemberDetail from './pages/MemberDetail';
import MemberEdit from './pages/MemberEdit';
import MemberManage from './pages/MemberManage';
import SignUp from './pages/SignUp';
import Write from './pages/Write';
import StudyManage from './pages/StudyManage';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={INIT_PATH} element={<Initial />} />
      <Route path="/api/studies/:id" element={<Detail />} />
      <Route path={MAIN_PATH} element={<Main />} />
      <Route path={SIGN_UP_PATH} element={<SignUp />} />
      <Route path={WRITE_PATH} element={<Write />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/memberEdit" element={<MemberEdit />} />
      <Route path={MEMBER_DETAIL_PATH} element={<MemberDetail />} />
      <Route path={MEMBER_MANAGE_PATH} element={<MemberManage />} />
      <Route path={STUDY_MANAGE_PATH} element={<StudyManage />} />
      <Route path={LOAD_PATH} element={<Loading />} />
      <Route path={ETC_PATH} element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

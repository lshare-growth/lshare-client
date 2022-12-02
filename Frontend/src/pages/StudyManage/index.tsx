import AuthorizedLayout from '@components/AuthorizedLayout';
import Layout from '@components/Layout';
import Posting from '@components/Posting';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import { MEMBER_MANAGE_PATH, STUDY_PATH } from '../../constants/route';
import * as S from './style';

const StudyManage = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [studies, setStudies] = useRecoilState(studiesState);

  const handleClickManage = () => {
    navigate(`${MEMBER_MANAGE_PATH}`);
  };

  return (
    <Layout>
      <S.Container>
        <S.Title>스터디 관리</S.Title>
        <S.HorizontalDivider direction="horizontal" />
        <S.ItemContainer>
          {studies.map(({ id, nickName, time, title, infos, viewCount, likeCount, commentCount, isRecruiting, content, tags }) => (
            <>
              <S.Item key={`studyMange-posting-${id}`}>
                <S.CustomLink to={`${STUDY_PATH}/${id}`}>
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
                </S.CustomLink>
                <S.CustomButton mode="accent" size="small" handleClick={handleClickManage}>
                  관리
                </S.CustomButton>
              </S.Item>
              <S.HorizontalDivider direction="horizontal" />
            </>
          ))}
        </S.ItemContainer>
      </S.Container>
    </Layout>
  );
};

export default StudyManage;

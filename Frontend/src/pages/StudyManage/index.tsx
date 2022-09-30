import Layout from '@components/Layout';
import Posting from '@components/Posting';
import { postings } from '@components/mocks';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import myStudiesState from '@store/MyStudies';
import { useEffect } from 'react';
import * as S from './style';

const StudyManage = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useRecoilState(myStudiesState);

  useEffect(() => {
    // TODO: 서버요청으로 postings받아오기
    setStudies(postings);
  }, []);

  const handleClickManage = () => {
    navigate('/memberManage');
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
                <S.CustomLink to={`/api/studies/${id}`}>
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

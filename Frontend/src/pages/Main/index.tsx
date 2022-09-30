import Layout from '@components/Layout';
import Posting from '@components/Posting';
import { progressTabs, tabs } from '@components/mocks';
import * as S from '@pages/Main/styled';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import axios from 'axios';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';
import { WRITE_PATH } from '../../constants/route';

const Main = () => {
  const [studies, setStudies] = useRecoilState(studiesState);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [selectedProgressTabId, setSelectedProgressTabId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const setDatas = async () => {
      const url = 'api/studies?page=0&pageSzie=10&sortOrder=COMMENT';
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`);

        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
          return;
        }
        type dataKeyType =
          | 'id'
          | 'title'
          | 'content'
          | 'studyOrganizer'
          | 'studyStatus'
          | 'hashTags'
          | 'currentStudyMemberCount'
          | 'district'
          | 'meeting'
          | 'commentCount'
          | 'viewCount'
          | 'likeCount'
          | 'createdAt'
          | 'maxStudyMemberCount'
          | 'startDate'
          | 'endDate';
        type dataType = Record<dataKeyType, any>;
        const targetDatas: dataType[] = response.data.contents.page;
        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;
        const currentPostings = targetDatas.map((targetData) => {
          const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
            targetData;
          // eslint-disable-next-line prefer-destructuring
          const hashTags: tagType[] = targetData.hashTags;
          const tags = hashTags?.map(({ studyId, tagName }) => ({
            id: studyId,
            content: tagName,
          }));
          return {
            id,
            nickName: studyOrganizer,
            title,
            time: '10분전',
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
                content: meeting,
              },
              {
                id: 3,
                type: 'limit',
                content: `${maxStudyMemberCount}`,
              },
              {
                id: 4,
                type: 'end',
                content: `${endDate}`,
              },
            ],
            commentCount,
            viewCount,
            likeCount,
            isRecruiting: studyStatus === 'IN_PROGRESS',
            createdDate: createdAt,
            currentStudyMemberCount,
            maxStudyMemberCount,
          };
        });
        setStudies(currentPostings);
      } catch (error: any) {
        console.log(error);
      }
    };
    setDatas();
  }, []);

  const handleClickProgressTab = (selectedId: number) => {
    setSelectedProgressTabId(selectedId);
  };

  const handleClickTab = (selectedId: number) => {
    setSelectedTabId(selectedId);
  };

  const handleClickPosting = () => {
    navigate(`${WRITE_PATH}`);
  };

  return (
    <Layout>
      <S.Container>
        <S.CustomProgressTabsContainer>
          <S.CustomProgressTabs tabs={progressTabs} selectedTabId={selectedProgressTabId} handleClick={handleClickProgressTab} />
        </S.CustomProgressTabsContainer>
        <S.HorizontalDivider direction="horizontal" />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px' }}>
          <S.CustomTabs tabs={tabs} selectedTabId={selectedTabId} handleClick={handleClickTab} />
          <Button mode="accent" size="small" handleClick={handleClickPosting}>
            글 작성
          </Button>
        </div>
        <S.HorizontalDivider direction="horizontal" />
        <S.PostingContainer>
          {studies.map(({ id, nickName, time, title, isRecruiting, infos, viewCount, likeCount, commentCount, content, tags }) => (
            <>
              <S.CustomLink to={`/api/studies/${id}`}>
                <S.PostingItem key={`main-posting-${id}`}>
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
                    handleClick={handleClickPosting}
                  />
                </S.PostingItem>
              </S.CustomLink>
              <S.HorizontalDivider direction="horizontal" />
            </>
          ))}
        </S.PostingContainer>
      </S.Container>
    </Layout>
  );
};

export default Main;

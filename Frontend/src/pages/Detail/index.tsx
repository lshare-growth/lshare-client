/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import Comment from '@components/Comment';
import useMouse from '@hooks/useMouse';
import Title from '@components/common/Title';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect, useState, useRef } from 'react';
import replyType from '@components/types/Comment';
import commentState from '@store/Comment';
import studyType from '@components/types/Studies';
import axios from 'axios';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import * as S from './style';

const items = [
  { id: 1, content: '', nickName: '이든' },
  { id: 2, content: '', nickName: 'Jun' },
  { id: 3, content: '', nickName: '방태' },
  { id: 4, content: '', nickName: 'Jay' },
  { id: 5, content: '', nickName: 'crong' },
  { id: 6, content: '', nickName: '호눅스' },
];
const participants = 3;
const maxPeople = 5;
const peoples = `${participants}/${maxPeople}`;

const Detail = () => {
  const navigate = useNavigate();
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const { id } = useParams<{ id: string }>();
  const currentId = Number(id);

  const myName = '이든';
  // eslint-disable-next-line no-unused-vars
  const [study, setStudy] = useState<studyType>();
  const [isShowingLiked, setIsShowingLiked] = useState(false);
  const [showingLikeCount, setShowingLikeCount] = useState(0);
  const [isStudyRecruiting, setIsStudyRecruiting] = useState(false);
  // TODO: any 타입 구체화
  const [comments, setComments] = useRecoilState(commentState);
  const [currentComments, setCurrentComments] = useState<replyType[]>([]);
  type memberKeyType = 'id' | 'content' | 'nickName';
  type memberType = Record<memberKeyType, any>;
  const [studyMembers, setStudyMembers] = useState<memberType[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [contentPageIdx, setContentPageIdx] = useState(0);
  const lastPageIdx = 3;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getStudy = async () => {
      try {
        const response = await axios.get(`${process.env.END_POINT}api/studies/${currentId}`);
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }

        // TODO: study 업데이트 하기
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

        const targetData: dataType = response.data.study;
        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;
        const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
          targetData;

        // eslint-disable-next-line prefer-destructuring
        const hashTags: tagType[] = targetData.hashTags;
        const tags = hashTags?.map(({ studyId, tagName }) => ({
          id: studyId,
          content: tagName,
        }));
        const currentStudy = {
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

        setShowingLikeCount(currentStudy.likeCount);
        setIsStudyRecruiting(currentStudy.isRecruiting);

        console.log(currentStudy);
        console.log('currentStudy');
        setStudy(currentStudy);

        const isLiked = response.data.likeClicked !== 'FALSE';
        setIsShowingLiked(isLiked);
        type apiCommentType = typeof response.data.comments[0];

        const apiComments: apiCommentType[] = response.data.comments;
        const targetReactions = apiComments[0]?.reactions[0];
        type reactionType = typeof targetReactions;

        if (!apiComments) {
          return;
        }

        type apiStudyMemberType = typeof response.data.studyMembers[0];
        const apiMembers: apiStudyMemberType[] = response.data.studyMembers;

        const members = apiMembers.map(({ id, githubId, profileImageUrl }) => ({
          id,
          nickName: githubId,
          content: profileImageUrl,
        }));
        setStudyMembers(members);

        // eslint-disable-next-line no-shadow
        const currentReplys = apiComments.map((reply) => {
          // eslint-disable-next-line no-shadow
          const { id, githubId, profileImage, content } = reply;
          // eslint-disable-next-line prefer-destructuring
          const reactions: reactionType[] = reply.reactions;
          return {
            id,
            nickname: githubId,
            time: '',
            isEditied: false,
            replyNum: 0,
            commentId: id,
            content,
            avatorSrc: profileImage,
            avatorAlt: githubId,
            // eslint-disable-next-line no-shadow
            emojis: reactions.map(({ id, emotion, reactionCount, reactionClicked }) => ({
              id,
              type: emotion,
              value: emotion,
              count: reactionCount,
              isSelected: reactionClicked === 'TRUE',
            })),
            isAuthorized: false,
          };
        });

        setComments([...currentReplys]);
        setCurrentComments([...currentReplys]);
      } catch (error: any) {
        console.log(error);
      }
    };
    getStudy();
  }, []);

  useEffect(() => {
    const getEmotions = async () => {
      const EMOTION_URL = 'api/reactions';
      try {
        const response = await axios.get(`${process.env.END_POINT}${EMOTION_URL}`);

        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getEmotions();
  }, []);

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

  const handleClickToggleLike = () => {
    const postLikePosting = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.post(`${process.env.END_POINT}api/studies/${id}/likes`, undefined, {
          headers,
        });
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    postLikePosting();
    if (study) {
      setShowingLikeCount(isShowingLiked ? study.likeCount - 1 : study.likeCount + 1);
    }
    setIsShowingLiked(!isShowingLiked);
  };

  const handleClickEdit = () => {
    navigate(`/edit/${study?.id}`);
  };

  const deleteCurrentStudy = () => {
    const deleteStudy = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.delete(`${process.env.END_POINT}api/studies/${currentId}`, { headers });

        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    deleteStudy();
    navigate('/api/studies');
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const handleToggleProgress = () => {
    // TODO: 모집상태 변경 API 요청
    setIsStudyRecruiting(!study?.isRecruiting);
  };

  const handleClickRegister = () => {
    const postStudySignUp = async () => {
      const token = localStorage.getItem('token');
      const data = {
        memberId: 1,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.post(`${process.env.END_POINT}api/studies/${id}/studyRequest`, undefined, { headers });

        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    postStudySignUp();
  };

  useEffect(() => {
    console.log(study);
    console.log('study');
  }, [study]);
  const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (!target) {
      return;
    }

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (contentPageIdx > lastPageIdx) {
          return;
        }
        observer.unobserve(target);

        const addData = async (url: string) => {
          console.log('데이터 추가');
        };

        addData('');

        setContentPageIdx(contentPageIdx + 1);

        observer.observe(target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, { threshold: 0 });

  // TODO : custom hook으로 수정하기
  useEffect(() => {
    if (!target) {
      return;
    }

    observer.observe(target);

    // eslint-disable-next-line consistent-return
    return () => observer.unobserve(target);
  }, [target, onIntersect, observer]);

  const handleClickCancel = () => {};

  const handleClickConfirm = () => {
    deleteCurrentStudy();
  };

  const handleModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <S.Container>
        <S.TitleContainer>
          <S.Flex>
            <S.FlexBox>
              <S.CustomLabel mode="accent" size="medium">
                {study?.isRecruiting ? '모집중' : '모집완료'}
              </S.CustomLabel>
              <S.CustomCommentLabel isWriter nickname={study?.nickName || '닉네임'} />
              <S.Day>{study?.createdDate || '2022-09-08'}</S.Day>
              <S.Count count={study?.viewCount || 0}>
                <Icon mode="views" />
              </S.Count>
            </S.FlexBox>
            <div>
              <Button size="small" handleClick={handleClickEdit}>
                수정
              </Button>
              <S.DeleteButton size="small" handleClick={handleClickDelete}>
                삭제
              </S.DeleteButton>
            </div>
          </S.Flex>
        </S.TitleContainer>
        <S.Title>{study?.title || 'ts 스터디 모집'}</S.Title>
        <S.HorizontalDivider direction="horizontal" />
        <S.Content>{study?.content || '성실하게 스터디하실 분 찾습니다. 성실하게 스터디하실 분 찾습니다. 성실하게 스터디하실 분 찾습니다.'}</S.Content>
        {study?.tags && <S.CustomLabelList mode="default" size="small" items={study?.tags} />}
        <S.ControlsContainer>
          {myName === study?.nickName &&
            (isStudyRecruiting ? (
              <Button mode="accent" size="medium" handleClick={handleToggleProgress}>
                모집완료 설정
              </Button>
            ) : (
              <Button size="medium" handleClick={handleToggleProgress}>
                모집완료 해제
              </Button>
            ))}
          {myName !== study?.nickName &&
            (!isStudyRecruiting ? (
              <Button mode="accent" size="medium" handleClick={handleClickRegister}>
                참여신청
              </Button>
            ) : (
              <Button mode="accent" size="medium" disabled>
                모집완료
              </Button>
            ))}
          <S.CustomLikeButton mode="default" size="medium" handleClick={handleClickToggleLike} isSelected={isShowingLiked}>
            <S.CustomLikeIconCountBox count={showingLikeCount}>
              <Icon mode="thumbsUp" />
            </S.CustomLikeIconCountBox>
          </S.CustomLikeButton>
          <span style={{ position: 'relative' }} onFocus={handleMouseOver} onBlur={handleMouseOut} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <S.PopUp isHovered={isMouseOvered}>
              {studyMembers.map((item) => (
                <S.EmojiItem key={`items-${item.id}-${item.content}`}>
                  <S.UserContainer>
                    <S.CustomAvatar src={item.content} alt="" />
                    <Title title={item.nickName} />
                  </S.UserContainer>
                </S.EmojiItem>
              ))}
            </S.PopUp>
            <S.CustomButton mode="default" size="medium">
              <S.CustomIconCountBox count={peoples}>
                <Icon mode="users" />
              </S.CustomIconCountBox>
            </S.CustomButton>
          </span>
        </S.ControlsContainer>
        <S.CustomCommentWrite id="comment" commentId={currentId} isAuthorized placeholder="" avatorSrc="" avatorAlt="" nickname={study?.nickName || '닉네임'} />
        <S.CommentCount>댓글 {study?.commentCount}개</S.CommentCount>
        <S.ReplyContainer>
          {currentComments.map(({ nickname, time, isEditied, replyNum, avatorSrc, avatorAlt, emojis, isAuthorized }, index) => (
            <li key={`reply-${currentComments[index].id}`}>
              <Comment
                id={currentComments[index].id}
                nickname={nickname}
                time={time}
                isEditied={isEditied}
                replyNum={replyNum}
                commentId={currentId} /** commentId 네이밍 바꾸기 */
                content={currentComments[index].content}
                avatorSrc={avatorSrc}
                avatorAlt={avatorAlt}
                emojis={emojis}
                isAuthorized={isAuthorized}
                writer={study?.nickName || '닉네임'}
              />
            </li>
          ))}
          <div ref={(currentTarget) => setTarget(currentTarget)} />
        </S.ReplyContainer>
      </S.Container>
      <Portal>
        {isModalVisible && (
          <Modal onClose={handleModal} ref={modalRef}>
            <DoubleButtonModalArea handleClickLeftButton={handleClickCancel} handleClickRightButton={handleClickConfirm}>
              스터디 삭제
              <h3>스터디를 삭제하시겠습니까?</h3>
              {BUTTON_CANCEL}
              {BUTTON_CONFIRM}
            </DoubleButtonModalArea>
          </Modal>
        )}
      </Portal>
    </Layout>
  );
};

export default Detail;

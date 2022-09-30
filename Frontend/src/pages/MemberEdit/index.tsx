import Layout from '@components/Layout';
import Avatar from '@components/common/Avatar';
import { useNavigate } from 'react-router-dom';

import * as S from './style';

const MemberEdit = () => {
  const navigate = useNavigate();
  const handleError = () => {};

  const handleClickEdit = () => {
    // TODO: 수정 API 요청
    navigate(-1);
  };

  const handleClickCancel = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <S.Container>
        <S.Title>회원수정</S.Title>
        <S.HorizontalDivider direction="horizontal" />
        <S.FlexBox>
          <Avatar size="large" />
          <S.UserInfos>
            <S.NickName>이든</S.NickName>
            <S.UserInfoArea>
              <S.UserInfoContainer>
                <S.CustomIcon mode="github" />
                <S.GithubId>hj-frontend-dev</S.GithubId>
              </S.UserInfoContainer>
            </S.UserInfoArea>
          </S.UserInfos>
        </S.FlexBox>
        <S.BetweenBox>
          <S.CustomInput label="지역" size="xsmall" id="disctrict" placeholder="서울" />
          <S.CustomInput label="생년월일" size="xsmall" id="birth" placeholder="1998.08.17" />
          <S.Rank mode="square" size="small" handleError={handleError} />
        </S.BetweenBox>
        <S.CustomInput label="블로그" size="medium" id="blog" placeholder="https://learnNsahre.com" />
        <S.BetweenBox>
          <S.CancelButton size="large" handleClick={handleClickCancel}>
            취소
          </S.CancelButton>
          <S.EditButton mode="accent" size="large" handleClick={handleClickEdit}>
            수정
          </S.EditButton>
        </S.BetweenBox>
      </S.Container>
    </Layout>
  );
};

export default MemberEdit;

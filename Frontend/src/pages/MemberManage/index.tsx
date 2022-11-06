import AuthorizedLayout from '@components/AuthorizedLayout';
import members from './constants';
import * as S from './style';

const MemberManage = () => (
  <AuthorizedLayout url={`${process.env.END_POINT}member/my-studies/study-management`}>
    <S.Container>
      <S.Title>스터디 신청자 관리</S.Title>
      <S.HorizontalDivider direction="horizontal" />
      <S.ItemContainer>
        {members.map(({ id, content }) => (
          <>
            <S.Item key={`member-${id}`}>
              <S.NickName>{content}</S.NickName>
              <S.ButtonContainer>
                <S.CustomButton mode="default" size="small">
                  수락
                </S.CustomButton>
                <S.CustomButton mode="accent" size="small">
                  거절
                </S.CustomButton>
              </S.ButtonContainer>
            </S.Item>
            <S.HorizontalDivider direction="horizontal" />
          </>
        ))}
      </S.ItemContainer>
    </S.Container>
  </AuthorizedLayout>
);

export default MemberManage;

import Layout from '@components/Layout';
import members from './constants';
import * as S from './style';

const MemberManage = () => (
  <Layout>
    <S.Container>
      <S.Title>스터디원 관리</S.Title>
      <S.HorizontalDivider direction="horizontal" />
      <S.ItemContainer>
        {members.map(({ id, content }) => (
          <>
            <S.Item key={`member-${id}`}>
              <S.NickName>{content}</S.NickName>
              <S.ButtonContainer>
                <S.CustomButton mode="default" size="small">
                  경고
                </S.CustomButton>
                <S.CustomButton mode="accent" size="small">
                  강퇴
                </S.CustomButton>
              </S.ButtonContainer>
            </S.Item>
            <S.HorizontalDivider direction="horizontal" />
          </>
        ))}
      </S.ItemContainer>
    </S.Container>
  </Layout>
);

export default MemberManage;

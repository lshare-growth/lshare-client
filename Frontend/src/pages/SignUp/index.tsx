// import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Layout from '@components/Layout';
import { useNavigate } from 'react-router-dom';
import options from './constants';
import * as S from './style';

const SignUp = () => {
  const navigate = useNavigate();

  const handleClickSignUp = () => {
    // TODO: 서버에게 가입 요청
    navigate('/api/studies');
  };

  return (
    <Layout>
      <S.Container>
        <S.TitleContainer>
          <S.Title>회원가입</S.Title>
        </S.TitleContainer>
        <S.HorizontalDivider direction="horizontal" />
        <S.CustomInput isEssential placeholder="닉네임" label="닉네임" id="studySearch" />
        <S.CustomInput label="블로그" placeholder="https://learnNsahre.com" id="studySearch" />
        <S.MailContainer>
          <Input placeholder="apple" size="xsmall" id="studySearch" label="이메일" />
          <S.Text>@</S.Text>
          <S.CustomInputXsmall size="xsmall" id="studySearch" />
          <S.CustomDropDown width="110px" height="48px" selectTitle="직접입력" options={options} />
        </S.MailContainer>
        <div>
          <S.LoginButton mode="accent" size="xlarge" handleClick={handleClickSignUp}>
            회원가입
          </S.LoginButton>
        </div>
      </S.Container>
    </Layout>
  );
};

export default SignUp;

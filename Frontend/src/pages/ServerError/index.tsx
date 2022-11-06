import * as S from './style';

const ServerError = () => (
  <S.ErrorContainer>
    <img src="https://i.imgur.com/qIufhof.png" alt="" />
    <h1>
      <span>500</span> <br />
      {/* <S.Msg>접근 권한이 없습니다.</S.Msg> */}
      <S.Msg>서버 내부 오류입니다.</S.Msg>
    </h1>
    {/* <S.AlarmMsg>올바른 경로를 이용해주세요.</S.AlarmMsg> */}
    {/* <p>We are currently trying to fix the problem.</p>
    <p className="info">
      Illustration taken from
      <a href="https://www.kapwing.com/404-illustrations" target="_blank" rel="noreferrer">
        kapwing.com
      </a>
    </p> */}
  </S.ErrorContainer>
);

export default ServerError;

import { CustomButton } from '@pages/NotFound/style';
import { useNavigate } from 'react-router-dom';
import { LANDING_PATH } from '../../constants/route';
import * as S from './style';

const ServerError = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(`${LANDING_PATH}`);
  };

  return (
    <S.ErrorContainer>
      <img src="https://i.imgur.com/qIufhof.png" alt="" />
      <h1>
        <span>500</span> <br />
        <S.Msg>서버 내부 오류입니다.</S.Msg>
      </h1>
      <CustomButton handleClick={handleClickHome}>홈으로 이동</CustomButton>
    </S.ErrorContainer>
  );
};

export default ServerError;

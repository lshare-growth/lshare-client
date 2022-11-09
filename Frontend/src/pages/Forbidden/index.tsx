import { CustomButton } from '@pages/NotFound/style';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { LANDING_PATH } from '../../constants/route';

const Forbidden = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(`${LANDING_PATH}`);
  };

  return (
    <S.Container>
      <S.Title>403</S.Title>
      <S.Content>Forbidden</S.Content>
      <S.Explain>올바른 경로로 접근해주세요.</S.Explain>
      <CustomButton handleClick={handleClickHome}>홈으로 이동</CustomButton>
    </S.Container>
  );
};

export default Forbidden;

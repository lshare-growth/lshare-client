import { useNavigate } from 'react-router-dom';
import NotFoundEmoji from '@assets/img/notFoundEmoji.png';
import * as S from './style';
import { LANDING_PATH } from '../../constants/route';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(`${LANDING_PATH}`);
  };

  return (
    <S.ErrorContainer>
      <S.NotFound id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>
              4<img src={NotFoundEmoji} alt="not found emoji" width="120px" height="120px" />4
            </h1>
          </div>
          <h2>해당 소스를 찾을 수 없습니다.</h2>
          <S.CustomButton handleClick={handleClickHome}>홈으로 이동</S.CustomButton>
        </div>
      </S.NotFound>
    </S.ErrorContainer>
  );
};

export default NotFound;

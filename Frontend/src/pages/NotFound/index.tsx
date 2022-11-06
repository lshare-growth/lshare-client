// import notFound from '@assets/img/notFound.png';
// import Button from '@components/common/Button';
// import { useNavigate } from 'react-router-dom';
// import * as S from './style';
// import { LANDING_PATH } from '../../constants/route';

// const NotFound = () => {
//   const navigate = useNavigate();

//   const handleClickHome = () => {
//     navigate(`${LANDING_PATH}`);
//   };

//   return (
//     <S.Container>
//       <S.FlexColumn>
//         <S.Image src={notFound} alt="notFound" />
//         <S.Explain>찾을 수 없는 페이지 입니다</S.Explain>
//         <S.FlexBox>
//           <Button handleClick={handleClickHome}>홈으로 이동</Button>
//         </S.FlexBox>
//       </S.FlexColumn>
//     </S.Container>
//   );
// };

// export default NotFound;
import notFound from '@assets/img/notFound.png';
import Button from '@components/common/Button';
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
          {/* <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p> */}
          {/* <a href="#">Back to homepage</a> */}
          <S.CustomButton handleClick={handleClickHome}>홈으로 이동</S.CustomButton>
        </div>
      </S.NotFound>
    </S.ErrorContainer>
  );
};

export default NotFound;

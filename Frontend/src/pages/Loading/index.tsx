import LoadingSpinner from '@components/common/LoadingSpinner';
import StyledContainer from '@pages/Loading/style';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Loading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const CALL_BACK_URL = 'api/oauth/callback/github?code=';
  useEffect(() => {
    const codeDate = location.search;
    const code = codeDate.split('code=')[1];
    const getToken = async (currentCode: string) => {
      try {
        const response = await axios.get(`${process.env.END_POINT}${CALL_BACK_URL}${currentCode}`);
        if (response.status === 404) {
          console.log('404 error');
          return;
        }

        if (response.status === 500) {
          console.log('500 error');
          return;
        }
        const newToken = response.data.accessToken;
        localStorage.setItem('token', newToken);

        navigate('/');
      } catch (error: any) {
        if (error.response) {
          // TODO: 에러 페이지로 이동
        }
      }
    };

    getToken(code);
  }, []);

  return (
    <StyledContainer>
      <LoadingSpinner />
    </StyledContainer>
  );
};

export default Loading;

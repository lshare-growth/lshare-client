import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  height: 100vh;
  vertical-align: 'middle';
`;

export const Explain = styled.h3`
  font-size: 16px;
  margin: 32px 0;
  text-align: center;
`;

export const Image = styled.img``;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexBox = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})}
`;

export const ErrorContainer = styled.div`
  text-align: center;
  margin: auto;
  padding: 4em;
  img {
    width: 256px;
    height: 225px;
  }

  h1 {
    margin-top: 1rem;
    font-size: 35px;
    text-align: center;

    span {
      font-size: 60px;
    }
  }
  p {
    margin-top: 1rem;
  }

  p.info {
    margin-top: 4em;
    font-size: 12px;

    a {
      text-decoration: none;
      color: rgb(84, 84, 206);
    }
  }
  //
`;

export const Msg = styled.h3`
  font-size: 24px;
  margin: 24px 0;
  font-weight: 200;
`;
export const AlarmMsg = styled.h3`
  color: ${({ theme }) => theme.colors.subTitle};
  font-size: 16px;
`;

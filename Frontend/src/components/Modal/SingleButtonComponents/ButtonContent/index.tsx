import Icon from '@common/Icon';
import * as S from './style';

type ButtonContentProps = {
  content: string;
};
const LoginButtonContent = ({ content }: ButtonContentProps) => (
  <S.Container>
    <Icon mode="github" />
    <S.ButtonName>{content}</S.ButtonName>
  </S.Container>
);

export default LoginButtonContent;

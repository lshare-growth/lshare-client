/* eslint-disable react/require-default-props */
import logo from '@assets/img/logo.png';
import * as S from './style';

type LogoProps = {
  className?: string;
  handleClick?: () => void;
};

const Logo = ({ className, handleClick }: LogoProps) => (
  <S.LogoContainer className={className} onClick={handleClick}>
    <S.CustomLogo src={logo} alt="logo" width="240px" height="40px" />
  </S.LogoContainer>
);

export default Logo;

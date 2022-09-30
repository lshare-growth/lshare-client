import * as S from './style';

type FooterProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};
const Footer = ({ className }: FooterProps) => (
  <S.Footer className={className}>
    <S.FooterContent>
      <p>
        <strong>© 2022 LearnNShare </strong>
      </p>
    </S.FooterContent>
  </S.Footer>
);

export default Footer;

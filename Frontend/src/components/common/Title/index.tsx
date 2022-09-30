import StyledTitle from '@components/common/Title/style';

type TitleProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  title: string;
};

const Title = ({ className, title }: TitleProps) => (
  <StyledTitle className={className}>{title}</StyledTitle>
);

export default Title;

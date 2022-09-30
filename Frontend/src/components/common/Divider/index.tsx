import * as S from './style';

type DividerProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  direction: 'vertical' | 'horizontal';
};
const Divider = ({ direction, className }: DividerProps) => <S.Divider className={className} direction={direction} />;

export default Divider;

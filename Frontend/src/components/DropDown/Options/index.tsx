import * as S from './style';
import { Items } from '../types';
import Item from './Item';

type OptionsProps = {
  options: Items[];
  handleClickSelect: () => void;
  // eslint-disable-next-line react/require-default-props
  type?: string;
};

const Options = ({ type, options, handleClickSelect }: OptionsProps) => (
  <S.Container>
    {options.map(({ content }) => (
      <Item type={type} key={`option-${content}`} option={content} handleClickSelect={handleClickSelect} />
    ))}
  </S.Container>
);

export default Options;

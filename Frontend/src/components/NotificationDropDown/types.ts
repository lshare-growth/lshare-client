export type Items = {
  id: number;
  option: string;
};

export default Items;

type keyType = 'medium' | 'small';
type sizeKeyType = 'width' | 'height';
type valueType = Record<sizeKeyType, string>;

export type DropDownSizeType = Record<keyType, valueType>;

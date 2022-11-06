/* eslint-disable react/require-default-props */
import Image from '@components/common/Image';
import { sizeType, DEFAULT_SIZE } from './constants';

type AvatarProps = {
  size?: sizeType;
  src?: string;
  alt?: string;
  className?: string;
  handleClick?: () => void;
};
const Avatar = ({ size = DEFAULT_SIZE, src, alt, className, handleClick }: AvatarProps) => {
  const handleError = () => {};
  return <Image className={className} mode="circle" size={size} src={src} alt={alt} handleClick={handleClick} handleError={handleError} />;
};

export default Avatar;

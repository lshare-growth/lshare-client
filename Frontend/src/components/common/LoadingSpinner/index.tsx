import StyledLoadingSpinner from './style';

type LoadingSpinnerProps = {
  // eslint-disable-next-line react/require-default-props
  size?: 'large' | 'medium';
};

const LoadingSpinner = ({ size = 'medium' }: LoadingSpinnerProps) => <StyledLoadingSpinner size={size} />;

export default LoadingSpinner;

import StyledButton from '@components/Carousel/Button/style';

type ButtonProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  icon: string;
  disabled: boolean;
  onClick: () => void;
};

const Button = ({ className, icon, disabled, onClick }: ButtonProps) => (
  <StyledButton disabled={disabled} className={className} onClick={onClick}>
    {icon}
  </StyledButton>
);

export default Button;

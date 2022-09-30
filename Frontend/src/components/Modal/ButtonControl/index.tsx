import { ReactNode } from 'react';

type ButtonControlProps = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const ButtonControl = ({ className, children }: ButtonControlProps) => <div className={className}>{children}</div>;

export default ButtonControl;

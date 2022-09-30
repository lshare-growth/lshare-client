import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

type PortalProps = {
  children: ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const element = document.getElementById('modal') as HTMLElement;
  return createPortal(children, element);
};

export default Portal;

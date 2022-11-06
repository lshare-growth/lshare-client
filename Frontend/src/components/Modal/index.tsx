/* eslint-disable react/require-default-props */
import { ReactNode, forwardRef } from 'react';
import * as S from './style';

type ModalProps = {
  children?: ReactNode;
  onClose?: () => void;
  position?: 'right' | 'middle' | 'moreRight';
};

type Ref = HTMLDivElement;

const Modal = forwardRef<Ref, ModalProps>(({ children, onClose, position = 'middle' }, ref) => (
  <S.Background onClick={onClose} position={position}>
    <S.Content ref={ref}>{children}</S.Content>
  </S.Background>
));

export default Modal;

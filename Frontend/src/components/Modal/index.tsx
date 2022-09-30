/* eslint-disable react/require-default-props */
import { ReactNode, forwardRef } from 'react';
import * as S from './style';

type ModalProps = {
  children?: ReactNode;
  onClose?: () => void;
};

type Ref = HTMLDivElement;

const Modal = forwardRef<Ref, ModalProps>(({ children, onClose }, ref) => (
  <S.Background onClick={onClose} ref={ref}>
    <S.Content>{children}</S.Content>
  </S.Background>
));

export default Modal;

import React from 'react';
import * as S from './style';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <S.Container>
    <S.CustomHeader type="header" />
    <S.Main>{children}</S.Main>
    <S.CustomFooter />
  </S.Container>
);

export default Layout;

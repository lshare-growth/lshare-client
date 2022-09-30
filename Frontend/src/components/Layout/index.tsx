import React from 'react';
import Footer from '@components/Footer';
import * as S from './style';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <S.Container>
    <S.CustomHeader type="header" />
    <S.Main>{children}</S.Main>
    <Footer />
  </S.Container>
);

export default Layout;

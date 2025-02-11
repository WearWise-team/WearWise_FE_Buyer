"use client"
import { usePathname } from 'next/navigation';

import Header from '../Header';
import Container from '../Container';
import AuthLayout from './AuthLayout';


export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const authImage = pathname === '/login'
    ? '/login.png'
    : pathname === '/register'
    ? '/register.png'
    : '/placeholder.png';
  return (
    <>
      {isAuthPage ? (
        <AuthLayout image={authImage}>
          {children}
        </AuthLayout>
      ) : (
        <>
          <Header />
          <Container>{children}</Container>
        </>
      )}
    </>
  );
}
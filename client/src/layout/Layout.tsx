import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import SimpleLoader from '../components/common/SimpleLoader';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading } = useSelector((state: RootState) => state.loading);
  return (
    <div className='relative min-h-screen'>
      {loading && <SimpleLoader />}
      <div className='w-full fixed top-0 z-10'>
        <Navbar />
      </div>
      <div className='pt-[75px]'>
        {children}
      </div>
    </div>
  );
}

export default Layout;
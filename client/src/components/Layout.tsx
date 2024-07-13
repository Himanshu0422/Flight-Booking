import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=''>
      <div className='w-full fixed'>
        <Navbar />
      </div>
      <div className='pt-[75px]'>
        {children}
      </div>
    </div>
  );
}

export default Layout;

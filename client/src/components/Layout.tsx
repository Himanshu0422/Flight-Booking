import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='relative'>
      <div className='z-10 w-full fixed'>
        <Navbar />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Layout;

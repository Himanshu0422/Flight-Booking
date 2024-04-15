import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
    return (
        <div className='relative'>
            <div className='z-5 w-full fixed'>
                <Navbar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout;
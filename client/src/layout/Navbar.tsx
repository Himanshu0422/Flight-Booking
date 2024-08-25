import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState('');

    const handleNavigation = () => {
        if(token) {
            navigate('/history');
        }else {
            navigate('/');
        }
    }

    useEffect(() => {
        const getToken = Cookies.get('token');
        setToken(getToken!);
      }, [])

    return (
        <nav className="flex justify-between items-center bg-white px-4 md:px-8 h-[75px] border-b">
            <div className="text-black font-bold text-xl md:text-2xl ml-4 cursor-pointer" onClick={() => navigate('/home')}>Flights</div>
            <div className="flex items-center space-x-4 text-blue mr-4 cursor-pointer" onClick={handleNavigation}>
                {token ? 'History' : 'Login/SignUp'}
            </div>
        </nav>
    );
};

export default Navbar;

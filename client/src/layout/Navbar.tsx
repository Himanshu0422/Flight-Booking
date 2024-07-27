import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center bg-white px-4 md:px-8 h-[75px] border-b">
            <div className="text-black font-bold text-xl md:text-2xl ml-4">Flights</div>
            <div className="hidden md:flex space-x-4 text-black gap-4 md:gap-20">
                <div className="hover:text-gray-400 cursor-pointer">
                    All Flights
                </div>
                <div className="hover:text-gray-400 cursor-pointer">
                    Your Orders
                </div>
                <div className="hover:text-gray-400 cursor-pointer">
                    Flights & Hotels
                </div>
            </div>
            <div className="flex items-center space-x-4 text-blue mr-4">
                <BellIcon className="bg-blue h-6 w-6 hover:text-blue-600 cursor-pointer" />
                <UserCircleIcon className="h-6 w-6 hover:text-gray-400 cursor-pointer" />
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-gray-100 px-4 py-4 md:px-8">
            {/* Left side */}
            <div className="text-black font-bold text-xl md:text-2xl ml-4">Flights</div>

            {/* Middle */}
            <div className="hidden md:flex space-x-4 text-black gap-4 md:gap-20">
                <div className="hover:text-gray-600">
                    All Flights
                </div>
                <div className="hover:text-gray-400">
                    Your Orders
                </div>
                <div className="hover:text-gray-600">
                    Flights & Hotels
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4 text-blue mr-4">
                <BellIcon className="bg-blue h-6 w-6 hover:text-blue-600" />
                <UserCircleIcon className="h-6 w-6 hover:text-gray-600" />
            </div>
        </nav>
    );
};

export default Navbar;
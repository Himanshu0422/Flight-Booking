import React from 'react';
import image from '../../../assets/Airline.jpeg';

const Card = () => {
    const backgroundStyles = {
        backgroundImage: `url(${image})`,
    };

    return (
        <div className='bg-slate-700 h-[22rem] md:w-[45%] rounded-lg'>
            <div style={backgroundStyles} className='h-full bg-cover rounded-lg flex justify-center items-end opacity-100'>
                <div className='flex flex-col w-[70%] items-center text-white mb-6 gap-2'>
                    <div className='text-3xl font-bold'>Flights</div>
                    <div className='flex flex-col items-center'>
                        <div className='text-sm'>Search Flights & Places to our most popular</div>
                        <div className='text-sm'>destinations</div>
                    </div>
                    <button className='bg-blue-600 p-3 text-sm rounded-md'><i class="fa-regular fa-paper-plane"></i> Show Flights</button>
                </div>
            </div>
        </div>
    );
};

export default Card;

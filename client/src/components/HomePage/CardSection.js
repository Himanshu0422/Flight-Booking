import React from 'react';
import Card from './components/Card';

const CardSection = () => {
    return (
        <div className='flex justify-between w-[85%] max-md:flex-col max-md:gap-5'>
            <Card />
            <Card />
        </div>
    )
}

export default CardSection;
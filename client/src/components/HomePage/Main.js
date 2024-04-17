import React from 'react';
import backgroundImage from '../../assets/backgroung-image.png';
import Intro from './components/Intro';
import SearchFlight from './components/SearchFlight';


const Main = () => {

    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
    };
    return (
        <div style={backgroundStyles} className='flex flex-col gap-32 justify-center max-sm:items-center h-[100vh] w-[100%] bg-cover bg-center'>
            <Intro />
            <div className='flex justify-center w-full'>
                <SearchFlight />
            </div>
        </div>
    )
}

export default Main;
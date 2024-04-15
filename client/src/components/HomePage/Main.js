import React from 'react';
import backgroundImage from '../../assets/backgroung-image.png';
import Intro from './components/Intro';
import SearchFlight from './components/Search';


const Main = () => {

    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
    };
    return (
        <div style={backgroundStyles} className='flex flex-col gap-20 justify-center max-sm:items-center h-[100vh] w-[100%] bg-cover bg-center'>
            <Intro />
            <SearchFlight />
        </div>
    )
}

export default Main;
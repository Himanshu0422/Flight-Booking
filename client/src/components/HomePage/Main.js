import React from 'react';
import backgroundImage from '../../assets/backgroung-image.png';
import Intro from './components/Intro';
import SearchFlight from './components/Search';


const Main = () => {

    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
    };
    return (
        <div style={backgroundStyles} className='relative h-[100vh] w-[100%] bg-cover bg-center max-sm:flex max-sm:justify-center'>
            <Intro />
            <SearchFlight />
        </div>
    )
}

export default Main;
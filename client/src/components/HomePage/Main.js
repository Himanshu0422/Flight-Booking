import React from 'react';
import backgroundImage from '../../assets/backgroung-image.png';
import Intro from './components/Intro';

const Main = () => {

    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
    };
    return (
        <div style={backgroundStyles} className='h-[100vh] w-[100%] bg-cover bg-center max-sm:flex max-sm:justify-center'>
            <Intro />
        </div>
    )
}

export default Main;
import React from 'react';

const Intro: React.FC = () => {
    return (
        <div className='space-y-4 mx-10 intro'>
            <div className='text-5xl font-extrabold max-sm:text-4xl max-sm:font-bold'>
                Let's Flight Now.
            </div>
            <div className='text-4xl text-blue-900 font-extrabold max-sm:text-3xl max-sm:font-bold'>
                Don't Worry Over Baggage.
            </div>
            <div>
                We Provide ticket services with most comfortable system in India.
            </div>
        </div>
    );
}

export default Intro;

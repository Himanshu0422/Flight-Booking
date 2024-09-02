import React from 'react';
import Main from '../components/HomePage/Main';
import Travel from '../components/HomePage/Travel';
import Trips from '../components/HomePage/Trips';

const Home: React.FC = () => {

	return (
		<div className='flex flex-col items-center gap-20'>
			<Main />
			{/* <Trips />
			<Travel /> */}
		</div>
	);
}

export default Home;

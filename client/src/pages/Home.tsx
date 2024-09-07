import React from 'react';
import Main from '../components/HomePage/Main';

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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Main from '../components/HomePage/Main';
import Travel from '../components/HomePage/Travel';
import Trips from '../components/HomePage/Trips';
import { getAllAirports } from '../redux/airports/airportAction';
import { AppDispatch } from '../redux/store';

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

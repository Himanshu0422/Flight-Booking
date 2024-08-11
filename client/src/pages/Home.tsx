import React, { useEffect } from 'react';
import Main from '../components/HomePage/Main';
import Trips from '../components/HomePage/Trips';
import Travel from '../components/HomePage/Travel';
import { useDispatch } from 'react-redux';
import { getAllAirports } from '../redux/airports/airportAction';
import { AppDispatch } from '../redux/store';

const Home: React.FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getAllAirports())
	}, [])

	return (
		<div className='flex flex-col items-center gap-20'>
			<Main />
			<Trips />
			<Travel />
		</div>
	);
}

export default Home;

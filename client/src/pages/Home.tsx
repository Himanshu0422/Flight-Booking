import React, { useEffect } from 'react';
import Main from '../components/HomePage/Main';
import axios from 'axios';

const Home: React.FC = () => {

	const startServer = async () => {
		try {
			axios.get(`${process.env.REACT_APP_BACKEND_BOOKING_API}/ping`);
			axios.get(`${process.env.REACT_APP_BACKEND_AUTH_API}/ping`);
		} catch (error) {
			console.log(error);	
		}
	}

	useEffect(() => {
		startServer();
	}, []);

	return (
		<div className='flex flex-col items-center gap-20'>
			<Main />
			{/* <Trips />
			<Travel /> */}
		</div>
	);
}

export default Home;

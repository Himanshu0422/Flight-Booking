import React from 'react'
import Main from '../components/HomePage/Main';
import Trips from '../components/HomePage/Trips';
import CardSection from '../components/HomePage/CardSection';
import Travel from '../components/HomePage/Travel';

const Home = () => {
	return (
		<div className='flex flex-col items-center gap-20'>
			<Main />
			<Trips />
			<CardSection />
			<Travel />
		</div>
	)
}

export default Home;
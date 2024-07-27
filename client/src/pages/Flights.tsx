import React from 'react';
import Filter from '../components/FlightsPage/Filter';
import FlightSection from '../components/FlightsPage/FlightSection';
import FlightsCount from '../components/FlightsPage/FlightsCount';
import Search from '../components/FlightsPage/Search';

const Flights: React.FC = () => {

  return (
    <div className='bg-gray-100 min-h-[calc(100vh-75px)] w-full overflow-x-hidden'>
      <Search />
      <FlightsCount />
      <Filter />
      <FlightSection />
    </div>
  );
}

export default Flights;

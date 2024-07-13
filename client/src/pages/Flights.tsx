import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Search from '../components/FlightsPage/Search';

const Flights: React.FC = () => {

  const { departureFlight } = useSelector(
    (state: RootState) => state.flight
  )
  const { returnFlight } = useSelector(
    (state: RootState)=> state.flight
  )

  console.log(departureFlight, 'departureFlight');
  console.log(returnFlight, 'returnFlight');
  

  return (
    <div className=''>
      <Search />
    </div>
  );
}

export default Flights;

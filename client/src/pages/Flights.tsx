import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Flights: React.FC = () => {

  const { departureFlight } = useSelector(
    (state: RootState) => state.departureflight
  )
  const { returnFlight } = useSelector(
    (state: RootState)=> state.returnflight
  )

  // console.log(departureFlight, 'departureFlight');
  // console.log(returnFlight, 'returnFlight');
  

  return (
    <div className='absolute top-20'>Flights</div>
  );
}

export default Flights;

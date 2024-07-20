import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FlightCard from "./components/FlightCard";

const FlightSection = () => {

  const { departureFlight } = useSelector(
    (state: RootState) => state.flight
  )
  const { returnFlight } = useSelector(
    (state: RootState)=> state.flight
  )


  return (
    <div className="flex flex-col items-center gap-10 mx-10">
      {
        departureFlight?.map((item) => {
          return (
            <FlightCard key={item.id} flight={item} />
          )
        })
      }
      <div className="h-6" />
    </div>
  );
};

export default FlightSection;

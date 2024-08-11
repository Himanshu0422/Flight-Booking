import React from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flight } from "../../../redux/flights/flightSlice";
import { RootState } from "../../../redux/store";
import { convertTo12HourFormat, getDay } from "../../../utils/Date";
import Button from "../../common/Button";

interface FlightCardProps {
  flight: Flight;
  isDeparture: boolean;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, isDeparture }) => {
  const { time: departureTime, period: departurePeriod } =
    convertTo12HourFormat(flight.departureTime);
  const { time: arrivalTime, period: arrivalPeriod } = convertTo12HourFormat(
    flight.arrivalTime
  );

  const navigate = useNavigate();
  const { departureDate, returnDate } = useSelector((state: RootState) => state.search);
  const flightDate = isDeparture ? departureDate : returnDate;

  return (
    <div className="flex max-md:flex-col bg-white rounded-xl gap-10 max-md:gap-4 justify-center items-center w-max max-lg:px-10 px-20 max-md:p-5 py-8 h-max shadow-lg">
      <div className="flex gap-10 xs:gap-5">
        <TimeInfo
          day={getDay(flightDate)}
          time={departureTime}
          period={departurePeriod}
          location={flight.departureAirport.city}
        />
        <ConnectionDot time={flight.flightTime} />
        <TimeInfo
          day={getDay(flightDate!.add(flight.nextDay, "day"))}
          time={arrivalTime}
          period={arrivalPeriod}
          location={flight.arrivalAirport.city}
        />
      </div>
      <div className="border border-dashed h-[100px] w-[0] max-md:h-[0] max-md:w-full" />
      <div className="md:space-y-4 max-md:flex gap-4 justify-end items-center w-full">
        <PriceInfo price={flight.price} currency="Rs" />
        <div>
          <Button onClick={() => navigate(`/passenger-details/${flight.flightNumber}`)}>Choose Flight</Button>
        </div>
      </div>
    </div>
  );
};

const TimeInfo = ({
  day,
  time,
  period,
  location,
}: {
  day: string;
  time: string;
  period: string;
  location: string;
}) => (
  <div>
    <div className="text-sm">{day}</div>
    <div className="flex text-2xl max-sm:text-lg font-semibold gap-2">
      <div>{time}</div>
      <div className="text-gray-400">{period}</div>
    </div>
    <div className="text-sm">{location}</div>
  </div>
);

const ConnectionDot = ({ time }: { time: string }) => (
  <div className="text-center space-y-1">
    <div className="text-xs">{time}</div>
    <div className="flex items-center">
      <div className="w-[10px] h-[10px] rounded-full border border-blue-500 max-xs:hidden" />
      <div className="border max-lg:w-[50px] w-[100px] border-dashed h-[0] max-xs:hidden" />
      <div>
        <div className="text-blue-500 border border-blue-500 rounded-full text-lg p-2 flex justify-center items-center">
          <GiAirplaneDeparture />
        </div>
      </div>
      <div className="border max-lg:w-[50px] w-[100px] border-dashed h-[0] max-xs:hidden" />
      <div className="w-[10px] h-[10px] rounded-full bg-blue-500 max-xs:hidden" />
    </div>
    <div className="text-xs">Direct</div>
  </div>
);

const PriceInfo = ({ price, currency }: { price: number, currency: string }) => (
  <div>
    <div className="max-md:hidden">Price</div>
    <div className="flex text-2xl font-semibold max-sm:text-lg gap-1">
      <div>{price} /</div>
      <div className="text-gray-400">{currency}</div>
    </div>
  </div>
);

export default FlightCard;

import React, { useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import PassengerClass from './PassengerClass';

const Passenger = ({passenger, setPassenger, flightClass, setFlightClass}) => {

    const [popup, setPopup] = useState(false);

    return (
        <div className="relative flex justify-center cursor-pointer items-center gap-4 border p-3 rounded-lg">
            <div className="border rounded-full p-3 flex justify-center">
                <IoPersonOutline />
            </div>
            <div onClick={() => setPopup(true)}>
                <div className="flex text-xs gap-1">
                    <div>Passenger</div>
                    <div>-</div>
                    <div>Class</div>
                </div>
                <div className="flex gap-1 text-sm">
                    <div>{passenger} Passenger</div>
                    <div>-</div>
                    <div>{flightClass}</div>
                </div>
            </div>
            {popup && (
                <PassengerClass
                    setPassenger={setPassenger}
                    setFlightClass={setFlightClass}
                    setPopup={setPopup}
                    passenger={passenger}
                    flightClass={flightClass}
                />
            )}
        </div>
    )
}

export default Passenger
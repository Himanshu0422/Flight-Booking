import React, { useState } from 'react';

const SearchFlight = () => {
    const [departureCity, setDepartureCity] = useState('Jakarta (CGK), Indonesia');
    const [arrivalCity, setArrivalCity] = useState('Seoul (ICN), South Korea');
    const [departureArrival, setDepartureArrival] = useState('23 Feb 2024 - One way');
    const [passengerClass, setPassengerClass] = useState('1 Adults - Economy');

    const handleSearch = () => {
        // Implement search logic here
        console.log('Searching for flight...');
    };

    return (
        <div className="absolute bottom-40 height-20vh left-100 bg-white p-4 rounded-md shadow-md flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 right-20">Search Flights</h1>
            <div className="flex items-center">
                <div className="flex items-center mr-4">
                    <div className="bg-orange-100 text-orange-500 rounded-full px-3 py-1 mr-2">
                        <i className="fas fa-plane-departure" />
                    </div>
                    <input
                        type="text"
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Departure city"
                    />
                </div>
                <div className="flex items-center mr-4">
                    <div className="bg-amber-100 text-amber-500 rounded-full px-3 py-1 mr-2">
                        <i className="fas fa-plane-arrival" />
                    </div>
                    <input
                        type="text"
                        value={arrivalCity}
                        onChange={(e) => setArrivalCity(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Arrival city"
                    />
                </div>
                <div className="flex items-center mr-4">
                    <div className="bg-blue-100 text-blue-500 rounded-full px-3 py-1 mr-2">
                        <i className="fas fa-calendar-alt" />
                    </div>
                    <input
                        type="text"
                        value={departureArrival}
                        onChange={(e) => setDepartureArrival(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Departure - Arrival"
                    />
                </div>
                <div className="flex items-center mr-4">
                    <div className="bg-green-100 text-green-500 rounded-full px-3 py-1 mr-2">
                        <i className="fas fa-user" />
                    </div>
                    <input
                        type="text"
                        value={passengerClass}
                        onChange={(e) => setPassengerClass(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Passenger - Class"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-orange-500 text-white rounded-md px-4 py-2 hover:bg-orange-600 transition-colors duration-300"
                >
                    Search Flight
                </button>
            </div>
        </div>
    );
};

export default SearchFlight;
import React, { useState, useEffect, useRef } from "react";

const PassengerClass = ({ setPassenger, setFlightClass, setPopup, passenger, flightClass }) => {
    const [selectedPassenger, setSelectedPassenger] = useState(passenger);
    const [selectedFlightClass, setSelectedFlightClass] = useState(flightClass);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                // Clicked outside the popup, so close it
                setPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setPopup]);

    const handleFlightClassChange = (classType) => {
        setSelectedFlightClass(classType);
    };

    const handleApply = () => {
        setPassenger(selectedPassenger);
        setFlightClass(selectedFlightClass);
        setPopup(false);
    };

    return (
        <div className="absolute rounded-xl space-y-5 bg-white border z-10 p-4 w-[400px]" ref={popupRef}>
            <div>
                <div className="font-semibold text-lg mb-2">Passenger</div>
                <div className="flex gap-2 border p-1 rounded-md">
                    {Array.from({ length: 9 }, (_, i) => (
                        <div
                            className={`px-3 py-1 rounded-md cursor-pointer ${selectedPassenger === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                            key={i + 1}
                            onClick={() => setSelectedPassenger(i + 1)}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <div className="font-semibold text-lg mb-2">Class</div>
                <div className="flex gap-4">
                    <div
                        className={`p-2 rounded-md cursor-pointer ${selectedFlightClass === 'Economy' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => handleFlightClassChange("Economy")}
                    >
                        Economy
                    </div>
                    <div
                        className={`p-2 rounded-md cursor-pointer ${selectedFlightClass === 'Premium Economy' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => handleFlightClassChange("Premium Economy")}
                    >
                        Premium Economy
                    </div>
                    <div
                        className={`p-2 rounded-md cursor-pointer ${selectedFlightClass === 'Business' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => handleFlightClassChange("Business")}
                    >
                        Business
                    </div>
                </div>
            </div>
            <button
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded"
                onClick={handleApply}
            >
                Apply
            </button>
        </div>
    );
};

export default PassengerClass;

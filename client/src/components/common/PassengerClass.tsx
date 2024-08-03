import React, { useState, useEffect, useRef } from "react";

interface PassengerClassProps {
  setPassenger: (passenger: number) => void;
  setPopup: (popup: boolean) => void;
  passenger: number;
}

const PassengerClass: React.FC<PassengerClassProps> = ({
  setPassenger,
  setPopup,
  passenger,
}) => {
  const [selectedPassenger, setSelectedPassenger] = useState<number>(passenger);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPopup]);

  const handleApply = () => {
    setPassenger(selectedPassenger);
    setPopup(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="rounded-xl space-y-5 bg-white border p-4 w-[350px]"
        ref={popupRef}
      >
        <div>
          <div className="font-semibold text-lg mb-2">Passenger</div>
          <div className="flex flex-wrap gap-2 border p-1 rounded-md">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                className={`px-3 py-1 rounded-md cursor-pointer ${
                  selectedPassenger === i + 1
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                key={i + 1}
                onClick={() => setSelectedPassenger(i + 1)}
              >
                {i == 9 ? '>9' : i + 1}
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PassengerClass;

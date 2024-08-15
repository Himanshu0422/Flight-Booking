import React, { useEffect, useRef, useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import { Airplane } from "../../redux/airports/airportSlice";

interface CitySelectModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCityClick: (city: string) => void;
  options: Airplane[];
}

const CitySelectModal: React.FC<CitySelectModalProps> = ({
  setIsOpen,
  handleCityClick,
  options,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const filteredOptions = options.filter((option) =>
    option.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[300px] h-[200px] bg-white border border-gray-300 rounded-md shadow-lg" ref={dropdownRef}>
        <input
          className="block w-full border-b border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          {filteredOptions.map((option) => (
            <div
              key={option.city}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border flex items-center"
              onClick={() => handleCityClick(option.city)}
            >
              <div className="mr-2">
                <GiAirplaneDeparture />
              </div>
              <div>
                <div className="text-sm">{option.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelectModal;

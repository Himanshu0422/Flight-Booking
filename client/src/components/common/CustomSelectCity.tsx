import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import { Airplane } from "../../redux/airports/airportSlice";

interface CustomSelectCityProps {
  value: string | null;
  onChange: any;
  options: Airplane[];
}

const CustomSelectCity: React.FC<CustomSelectCityProps> = ({
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCityClick = (city: string) => {
    const event: any = {
      target: {
        value: city,
      },
    };
    onChange(event);
    toggleDropdown();
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
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <div className="w-full cursor-pointer text-sm" onClick={toggleDropdown}>
          {value ? value : "Select City"}
        </div>
      </div>
      {isOpen &&
      <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div className="w-[300px] h-[200px] bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            className="block w-full border-b border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            {filteredOptions.map((option, index) => (
              <div
                key={index}
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
      }
    </div>
  );
};

export default CustomSelectCity;

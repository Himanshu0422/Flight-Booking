import { useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";

const CustomSelectCity = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCityClick = (city) => {
        onChange({ target: { value: city } });
        toggleDropdown();
    };

    return (
        <div className="relative">
            <div className="relative">
                <div
                    className="w-full cursor-pointer"
                    onClick={toggleDropdown}
                >
                    {value}
                </div>
            </div>
            {isOpen && (
                <div className="w-[300px] h-[200px] overflow-auto absolute z-10 -mt-5 bg-white border border-gray-300 rounded-md shadow-lg">
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
                                onClick={() => handleCityClick(option)}
                            >
                                <div className="mr-2">
                                    <GiAirplaneDeparture />
                                </div>
                                <div>
                                    <div className="text-sm">Mumbai, India</div>
                                    <div className="text-[10px]">Chhatrapati Shivaji International Airport</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelectCity;
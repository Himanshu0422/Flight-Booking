import { useState, useRef, useEffect } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";

const CustomSelectCity = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
                <div
                    className="w-full cursor-pointer text-sm"
                    onClick={toggleDropdown}
                >
                    {value}
                </div>
            </div>
            {isOpen && (
                <div className="w-[300px] h-[200px] overflow-auto absolute z-10 -mt-5 max-sm:-top-5 max-sm:-left-32 bg-white border border-gray-300 rounded-md shadow-lg">
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
                                    <div className="text-sm">{option}</div>
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

import React from 'react';
import BasicDatePicker from '../../../utils/DatePicker';
import dayjs from 'dayjs';

const DepartureDate = ({departureDate, setDepartureDate}) => {

    const minDate = dayjs(new Date());

    const handleDepartureDateChange = (date) => {
        setDepartureDate(date);
    };

    return (
        <div className="border p-3 rounded-lg flex gap-2 justify-center items-center">
            <div className="border rounded-full p-3 flex justify-center">
                <i className="fa-solid fa-calendar-days"></i>
            </div>
            <div className="space-y-1">
                <div className="text-xs">Departure</div>
                <BasicDatePicker
                    minDate={minDate}
                    value={departureDate}
                    onChange={handleDepartureDateChange}
                    type='departure'
                />
            </div>
        </div>
    )
}

export default DepartureDate;
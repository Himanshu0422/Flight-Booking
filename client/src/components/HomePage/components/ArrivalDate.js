import React, { useState } from 'react';
import getTodayDate from '../../../utils/Date';
import BasicDatePicker from '../../../utils/DatePicker';

const ArrivalDate = ({ arrivalDate, setArrivalDate }) => {

    const [oneway, setOneway] = useState(true);
    const minDate = getTodayDate();

    const handleArrivalDateChange = (date) => {
        setArrivalDate(date);
    };

    return (
        <div>
            {oneway ? (
                <div
                    className="border p-3 rounded-lg flex gap-2 cursor-pointer justify-center items-center h-full"
                    onClick={() => setOneway(false)}
                >
                    <div className="border rounded-full p-3 flex justify-center">
                        <i className="fa-solid fa-calendar-days"></i>
                    </div>
                    <div>
                        <div>Return</div>
                        <div className="text-xs">Tap to add a return date</div>
                    </div>
                </div>
            ) : (
                <div className="border p-3 rounded-lg flex gap-2 justify-center items-center">
                    <div className="border rounded-full p-3 flex justify-center">
                        <i className="fa fa-calendar-days"></i>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <div className="text-xs">Arrival</div>
                            <div
                                className="text-xs cursor-pointer"
                                onClick={() => setOneway(true)}
                            >
                                One Way
                            </div>
                        </div>
                        <BasicDatePicker
                            minDate={minDate}
                            value={arrivalDate}
                            onChange={handleArrivalDateChange}
                            type='arrival'
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ArrivalDate
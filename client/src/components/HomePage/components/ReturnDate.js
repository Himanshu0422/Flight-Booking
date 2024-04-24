import React, { useState } from 'react';
import BasicDatePicker from '../../../utils/DatePicker';
import dayjs from 'dayjs';

const ReturnDate = ({ returnDate, setReturnDate }) => {

    const [oneway, setOneway] = useState(true);
    const minDate = dayjs(new Date());

    const handleReturnDateChange = (date) => {
        setReturnDate(date);
    };
    const handleOneWay = () => {
        setOneway(true);
        setReturnDate(null);
    }
    const handleReturnWay = () => {
        setOneway(false);
        setReturnDate(new Date());
    }

    return (
        <div>
            {oneway ? (
                <div
                    className="border p-3 rounded-lg flex gap-2 cursor-pointer justify-center items-center h-full"
                    onClick={handleReturnWay}
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
                            <div className="text-xs">Return</div>
                            <div
                                className="text-xs cursor-pointer"
                                onClick={handleOneWay}
                            >
                                One Way
                            </div>
                        </div>
                        <BasicDatePicker
                            minDate={minDate}
                            value={returnDate}
                            onChange={handleReturnDateChange}
                            type='return'
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReturnDate;
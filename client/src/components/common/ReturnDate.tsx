import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { getDate } from "../../utils/Date";
import DatePickerModal from "./DatePickerModal";

interface ReturnDateProps {
  returnDate: Dayjs | null;
  setReturnDate: (date: Dayjs | null) => void;
}

const ReturnDate: React.FC<ReturnDateProps> = ({
  returnDate,
  setReturnDate,
}) => {
  const minDate: Dayjs = dayjs(new Date());

  const [returnModalOpen, setReturnModalOpen] = useState(false);

  const handleReturnDateChange = (date: Dayjs | null) => {
    setReturnDate(date);
  };

  const handleOneWay = () => {
    setReturnDate(null);
  };

  const handleReturnWay = () => {
    setReturnDate(dayjs(new Date()));
  };

  return (
    <div>
      {!returnDate ? (
        <div
          className="border p-3 rounded-xl flex gap-2 cursor-pointer justify-center items-center h-full"
          onClick={handleReturnWay}
        >
          <div className="border rounded-full p-3 flex justify-center">
            <i className="fa-solid fa-calendar-days"></i>
          </div>
          <div>
            <div>Return</div>
            <div className="text-xs">Tap to add return date</div>
          </div>
        </div>
      ) : (
        <div className="border p-3 rounded-xl flex gap-2 items-center w-auto">
          <div className="border rounded-full p-3 flex justify-center">
            <i className="fa fa-calendar-days"></i>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between">
              <div className="text-xs">Return</div>
              <div
                className="text-xs text-blue-400 cursor-pointer"
                onClick={handleOneWay}
              >
                One Way
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setReturnModalOpen(true)}
            >
              {getDate(returnDate)}
            </div>
          </div>
          <DatePickerModal
            open={returnModalOpen}
            handleClose={() => setReturnModalOpen(false)}
            selectedDate={returnDate}
            handleDateChange={handleReturnDateChange}
            title="Select Return Date"
            minDate={minDate}
          />
        </div>
      )}
    </div>
  );
};

export default ReturnDate;

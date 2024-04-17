import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createSvgIcon } from '@mui/material/utils';

const FlightLandIcon = createSvgIcon(
    <path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z" />,
    'FlightLandIcon',
);

const BasicDatePicker = ({ minDate, onChange, value, type }) => {
    const handleDateChange = (date) => {
        onChange(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {type === 'departure' ? <DatePicker
                value={dayjs(value)}
                onChange={handleDateChange}
                slots={{ openPickerIcon: FlightTakeoffIcon }}
                format="DD MMMM YYYY"
                minDate={dayjs(minDate)}
                size="small"
            />
                : <DatePicker
                    value={dayjs(value)}
                    onChange={handleDateChange}
                    slots={{ openPickerIcon: FlightLandIcon }}
                    size="small"
                    format="DD MMMM YYYY"
                    minDate={dayjs(minDate)}
                />}
        </LocalizationProvider>
    );
}

export default BasicDatePicker;

import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const filterOptions = [
  {
    icon: <AccessTimeIcon style={{ color: "blue" }} fontSize="small" />,
    label: "Time",
    onClick: () => alert("Time filter clicked")
  },
  {
    icon: <CurrencyRupeeIcon style={{ color: "blue" }} fontSize="small" />,
    label: "Price",
    onClick: () => alert("Price filter clicked")
  }
];

const Filter = () => {
  return (
    <div className="flex justify-center items-center w-[100%] py-8">
      <div className="flex gap-5 bg-white justify-center items-center min-w-max rounded-full py-2 px-4">
        {filterOptions.map((option, index) => (
          <div className="flex gap-3 items-center" key={index}>
            <div className="flex gap-1 justify-center items-center">
              {option.icon}
              <div>{option.label}</div>
            </div>
            <KeyboardArrowDownOutlinedIcon
              fontSize="small"
              onClick={option.onClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;

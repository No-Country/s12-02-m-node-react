import { useState } from "react";
import { BsFillClockFill } from "react-icons/bs";

function TimeInput({ propertyName, label, dataTest, className = "", state }) {
  const [time, setTime] = state;
  const handleChange = (e) => {
    setTime(e.target.value);
  };
  return (
    <label
      className={`${className} ${
        time && "bg-white"
      } m-2 relative max-w-xs overflow-hidden flex rounded-xl h-16`}
    >
      <input
        className="peer p-1 absolute transition-transform transform duration-200 ease-out-expo focus:translate-x-full rounded-r-xl w-1/2 text-3xl h-full focus:outline-none"
        type="time"
        data-test={dataTest}
        name={propertyName}
        onChange={handleChange}
      />
      <span className="peer-focus:rounded-r-none relative flex items-center justify-center gap-2 z-10 rounded-xl px-2 bg-white h-full w-1/2  ">
        <BsFillClockFill className="w-6 h-6" />
        {label}
      </span>
      {time && (
        <span className="bg-secondary-1 w-1/2 grid place-items-center text-3xl font-semibold text-white">
          {time}
        </span>
      )}
    </label>
  );
}

export default TimeInput;

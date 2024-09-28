import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

const CustomDateRangePicker = ({ dateFormat = "MM/dd/yyyy", value = [null, null], onChange, className = null }) => {
    const [startDate, endDate] = value;

    const setStartDate = (date) => {
        onChange?.([date, endDate]);
    };

    const setEndDate = (date) => {
        onChange?.([startDate, date]);
    };

    return (
        <div
            className={clsx(
                "flex lg:mr-4 relative border-b border-b-custom-border lg:min-w-[320px] items-center justify-center mb-4 lg:mb-0",
                className,
            )}
        >
            <div className="flex-1">
                <DatePicker
                    className="bg-transparent inline-block rounded text-center w-full lg:min-w-[60px] border-none focus:ring-0"
                    selected={startDate}
                    selectsStart
                    endDate={endDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat={dateFormat}
                />
            </div>
            <span className="inline-block separate text-light basis-[40px] text-center">-</span>
            <div className="flex-1">
                <DatePicker
                    className="bg-transparent inline-block rounded text-center w-full lg:min-w-[60px] border-none focus:ring-0"
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    dateFormat={dateFormat}
                />
            </div>
            <div className="flex-[0] text-primary stroke-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    className="date-range-calendar"
                >
                    <line
                        id="Line_1383"
                        data-name="Line 1383"
                        y2="3"
                        transform="translate(3.5 0.5)"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                    ></line>
                    <line
                        id="Line_1384"
                        data-name="Line 1384"
                        y2="3"
                        transform="translate(13.5 0.5)"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                    ></line>
                    <line
                        id="Line_1385"
                        data-name="Line 1385"
                        x2="16"
                        transform="translate(0.5 7.5)"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                    ></line>
                    <rect
                        id="Rectangle_4170"
                        data-name="Rectangle 4170"
                        width="16"
                        height="13"
                        rx="1"
                        transform="translate(0.5 3.5)"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                    ></rect>
                </svg>
            </div>
        </div>
    );
};

export default CustomDateRangePicker;

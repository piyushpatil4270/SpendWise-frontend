import React, { useState } from "react";
import moment from "moment";
import  DatePicker from "../components/Datepicker";
const SlidingDatePicker = ({selectedDate,setSelectedDate}) => {


    const handlePreviousDay = () => {
        setSelectedDate(prevDate => moment.utc(prevDate).subtract(1, 'days').toDate());
    };

    const handleNextDay = () => {
        setSelectedDate(prevDate => moment(prevDate).add(1, 'days').toDate());
    };
    const isBeforeToday = moment.utc(selectedDate).isBefore(moment(), 'day');

    return (
        <div className="p-[4px] w-full  flex bg-[#6ed9e2] items-center justify-center gap-4  border border-gray-300 my-2 rounded-md shadow-md">
            <span className="text-[18px] font-semibold cursor-pointer text-white" onClick={handlePreviousDay}>{'<'}</span>
            <span className="xs:text-[12px] sm:text-[16px] font-semibold text-white">{moment(selectedDate).format('DD MMMM YYYY')}</span>
            <span className={`text-[18px] cursor-pointer font-semibold text-white ${isBeforeToday?'text-white':'text-gray-500'}`} onClick={()=>{
               if(isBeforeToday){
                handleNextDay()
               }
            }}>{'>'}</span>
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        </div>
    );
};

export default SlidingDatePicker;

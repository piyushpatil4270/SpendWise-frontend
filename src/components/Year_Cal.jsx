import React, { useState } from "react";
import moment from "moment";

const SlidingDatePicker = ({currYear,setCurrYear}) => {


    const handlePreviousMonth = () => {
        setCurrYear(prevDate => moment.utc(prevDate).subtract(1, 'year').toDate());
    };
    
    const handleNextMonth = () => {
        setCurrYear(prevDate => moment.utc(prevDate).add(1, 'year').toDate());
    };
   

    return (
        <div className="p-[4px] w-full flex items-center justify-center gap-4 bg-[#6ed9e2] my-2 border border-gray-300 rounded-md shadow-md">
            <span className="text-[18px] font-semibold cursor-pointer text-white" onClick={()=>handlePreviousMonth()}>{'<'}</span>
            <span className="text-[15px] font-semibold text-white">{moment(currYear).utc().format('YYYY')}</span>
            <span className={`text-[18px] cursor-pointer font-semibold text-white`} onClick={()=>{
               handleNextMonth()
            }}>{'>'}</span>
            
        </div>
    );
};

export default SlidingDatePicker;

import React from 'react';

const Monthly_Card = ({ title, description, amount, date, category }) => {
  return (
    <div className='xs:w-[70%] sm:w-[30%] h-fit flex flex-col bg-white p-4 rounded-lg shadow-lg'>
      <div className="flex items-center justify-center">
      <span className='text-xs xs:text-[12px] sm:text-[14px] font-bold mb-2'>{date}</span>
      </div>
      
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xs xs:text-[12px] sm:text-[14px] font-semibold'>Title:</span>
          <span className='text-xs xs:text-[12px] sm:text-[14px]'>{title}</span>
        </div>
        {description && (
          <div className='flex justify-between items-center'>
            <span className='text-xs xs:text-[12px] sm:text-[14px] font-semibold'>Details:</span>
            <span className='text-xs xs:text-[12px] sm:text-[14px]'>{description}</span>
          </div>
        )}
        {category && (
          <div className='flex justify-between items-center'>
            <span className='text-xs xs:text-[12px] sm:text-[14px] font-semibold'>Category:</span>
            <span className='text-xs xs:text-[12px] sm:text-[14px]'>{category}</span>
          </div>
        )}
        <div className='flex justify-between items-center mt-2'>
          <span className='text-xs xs:text-[12px] sm:text-[14px] font-semibold'>Amount:</span>
          <span className='text-xs xs:text-[12px] sm:text-[14px]'>{amount}</span>
        </div>
      </div>
    </div>
  );
};

export default Monthly_Card;

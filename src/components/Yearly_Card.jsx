import React from 'react'

const Yearly_Card = ({month,amount}) => {
  return (
    <div className='xs:w-[70%] sm:w-[30%] h-fit flex flex-col bg-white p-4 rounded-lg shadow-lg'>
      
      
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xs xs:text-[12px] sm:text-[14px] font-semibold'>Month:</span>
          <span className='text-xs xs:text-[12px] sm:text-[14px]'>{month}</span>
        </div>
       
        
    
        
        <div className='flex justify-between items-center mt-2'>
          <span className='text-xs xs:text-[12px] sm:text-[14px] font-semibold'>Amount:</span>
          <span className='text-xs xs:text-[12px] sm:text-[14px]'>{amount}</span>
        </div>
      </div>
    </div>
  )
}

export default Yearly_Card

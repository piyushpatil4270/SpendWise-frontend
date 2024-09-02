import React, { useState } from 'react'
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import FoodPng from "../utils/Food_Image.jpeg"
import Transport from "../utils/Transport_Image.jpeg"
import Utilities from "../utils/Utilities_Image.png"
import Entertainment from "../utils/Entertainment_Image.jpeg"
const Daily_card= ({title,description,category}) => {
  const [showDesc,setShowdesc]=useState(false)
  return (
    <div className="flex flex-col items-center justify-center gap-[2px]">
                  <div className="flex items-center justify-start gap-5">
                  {category==="food"?(<div>
                    <img src={FoodPng} className='xs:w-3 xs:h-3 rounded-full  sm:h-4 sm:w-4 bg-inherit' alt="category" />
                    </div>):(category==="transport"?(<img src={Transport} className='xs:w-3 xs:h-3 rounded-full sm:h-4 sm:w-4 bg-inherit' alt="category" />):(category==="Entertainment"?(<img src={Entertainment} className='rounded-full xs:w-3 xs:h-3  sm:h-4 sm:w-4 bg-inherit' alt="category" />):(<img src={Utilities} className='rounded-full xs:w-3 xs:h-3  sm:h-4 sm:w-4 bg-inherit' alt="category" />)))}
                    <span className="mx-[2px] xs:w-[30%] sm:w-[30%] font-normal text-black xs:text-[12px] sm:text-[15px]">
                      {title}
                    </span>
                    <div className='mx-2'>
                    {!showDesc ?(<ArrowCircleDownIcon
                      fontSize="15px"
                      onClick={()=>setShowdesc(!showDesc)}
                      style={{ marginTop: "2px", marginBottom: "2px" }}
                    />):(<ArrowCircleUpIcon
                      fontSize="15px"
                      onClick={()=>setShowdesc(!showDesc)}
                      style={{ marginTop: "2px", marginBottom: "2px" }}
                    />)}
                    </div>
                  
                    
                  </div>
                  {showDesc && <div className="flex  items-center justify-start mt-[2px]  w-full">
                    <span className=" xs:text-[10px] sm:text-[12px] mx-[2px]">{description}</span>
                  </div>}
                  
                </div>
  )
}

export default Daily_card

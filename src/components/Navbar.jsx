import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"

const Navbar = ({isPremium,setPremium,setIsAuth}) => {
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const pathName=useLocation().pathname
  const checkUser=async()=>{
    try {
      const userToken=localStorage.getItem("token")
      const res=await axios.get("https://www.expensetracker2.kesug.com/premium/user",{headers:{"Authorization":userToken}})
      setLoading(true)
      console.log(res.data)
      setLoading(false)
      if(res?.data?.isPremium){
        setPremium(true)
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    checkUser()
  },[])
 
  

  return (
    <div className='w-full xs:h-[100px] sm:h-[110px]  bg-[#50bcbd] flex flex-col items-center xs:gap-[4px] sm:gap-[12px]'>
        <div className='w-full flex my-2   px-2 py-2  items-center justify-center '>
         <div className='xs:w-[60%] sm:w-[70%] xs:mx-[4] '>
         <span className='text-white xs:text-[14px] font-semibold sm:text-[15px]'>Day To Day Expenses</span>
         </div>
         <div className='flex justify-center   xs:gap-5 gap-6'>
         <Link to={isPremium?pathName:"/premium"}><span className={`text-white xs:text-[10px] sm:text-[13px]`}>{loading?"...":isPremium?`Premium User`:`Upgrade Premium`}</span></Link>
         <div className='flex justify-center items-center  xs:gap-5 gap-6'>
         <button className='xs:text-[10px] xs:h-[15px] sm:h-[25px] p-2 flex items-center justify-center sm:text-[13px] text-white bg-slate-300  rounded-sm'onClick={()=>{
          setIsAuth(false)
          localStorage.removeItem("token")
          setPremium(false)
          localStorage.removeItem("premium")
          navigate("/")
         }}>Logout</button>
         </div>
         </div>
        </div>
        <div className='w-full flex justify-center items-center sm:gap-[90px] xs:gap-6 xs:my-2 my-1'>
          <Link to={"/"}>
          <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/' && `xs:border-b-2 p-1 border-white`}`}>Daily</span>
          </Link>
          <Link to={"/monthly"}>
          <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/monthly' && `xs:border-b-2 p-1 border-white`} `}>Monthly</span>
          </Link>
         <Link to={"/yearly"}>
         <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/yearly' && `xs:border-b-2 p-1 border-white`}`}>Yearly</span>
         </Link>
         { <Link to={"/stats"}>
          <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/stats' && `xs:border-b-2 p-1 border-white`} `}>Stats</span>
          </Link>}
          <Link to={"/summary"}>
          <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/summary' && `xs:border-b-2 p-1 border-white`} `}>Summary</span>
          </Link>
        </div>
      
    </div>
  )
}

export default Navbar
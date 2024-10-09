import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Year_Cal from "../components/Year_Cal"
import Yearly_Card from '../components/Yearly_Card'

const Yearly = () => {
  const [expenses,setExpenses]=useState([])
  const [currYear,setCurrYear]=useState(moment.utc().startOf("year").toDate())
  const fetchYearlyExpenses=async()=>{
    try {
      const userToken=localStorage.getItem("token")
      const res=await axios.post("https://spend-wise-backend-psi.vercel.app/expense/getByYear",{date:currYear},{headers:{"Authorization":userToken}})
      setExpenses(res.data.expenses)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
   fetchYearlyExpenses()
   console.log("curryear is ",currYear)
  },[currYear])
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className="flex justify-center items-center my-2 p-2 w-full">
      <div className="flex justify-center items-center  w-[80%]  m-2">
      <Year_Cal currYear={currYear} setCurrYear={setCurrYear} />
      </div>
      
          
        </div>
        {expenses.map((expense)=>{
         const formattedDate=moment.utc(expense.month,"YYYY-MM").format("MMMM YYYY")
          return <Yearly_Card month={formattedDate} amount={expense.totalAmount}  />
        })}
        </div>
  )
}

export default Yearly

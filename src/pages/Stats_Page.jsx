import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpensePieChart from '../components/ExpensePie';
import MonthlyExpenseChart from '../components/ExpenseBar';
import Statistics from "../components/Statistics";
import moment from "moment"

const Stats_Page = () => {
    const [data, setdata] = useState([]);
    const [catArray, setCatArray] = useState([0, 0, 0, 0]);
    const [monthArray, setMonthArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [loading,setLoading]=useState(false)

    async function groupInArray(categoryStats) {
        let tempCatArray = [0, 0, 0, 0];
        for (let i = 0; i < categoryStats.length; i++) {
            if (categoryStats[i].category === "utilities") {
                tempCatArray[0] += parseInt(categoryStats[i].totalAmount);
            } else if (categoryStats[i].category === "entertainment") {
                tempCatArray[1] += parseInt(categoryStats[i].totalAmount);
            } else if (categoryStats[i].category === "food") {
                tempCatArray[2] += parseInt(categoryStats[i].totalAmount);
            } else if (categoryStats[i].category === "transport") {
                tempCatArray[3] += parseInt(categoryStats[i].totalAmount);
            }
            else if(categoryStats[i].category ===""){
                tempCatArray[0]+=parseInt(categoryStats[i].totalAmount)
            }
        }
        setCatArray(tempCatArray);
    }

    async function groupInArray2(month){
        let temp=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for(let i=0;i<month.length;i++){
           
            const monthIndex = moment(month[i].monthName, 'MMMM').month() + 1
            temp[monthIndex-1] += parseInt(month[i].amount);
        }
        setMonthArray(temp)
        console.log("Data is ",temp)
    }
    const fetchLeaderboard = async () => {
        try {
            const userToken = localStorage.getItem("token");
            const res = await axios.get("https://spend-wise-backend-psi.vercel.app/expense/leaderboard", { headers: { "Authorization": userToken } });
            setdata(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStats = async () => {
        try {
            const userToken = localStorage.getItem("token");
            const res = await axios.get("https://spend-wise-backend-psi.vercel.app/expense/expenseStats", { headers: { "Authorization": userToken } });
            console.log("The data of stats is ", res.data);
            await groupInArray(res.data?.categoryStats);
            await groupInArray2(res.data?.monthlyData)
            console.log("grouped by category ", catArray);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchLeaderboard();
        fetchStats();
        setLoading(false)
    }, []);
     {loading && <span>Loading...</span>}
    return (
        <div className='flex flex-col items-start justify-center p-4'>
            <div className='w-full p-4'>
                <h2 className='text-xl mb-4'>Leaderboard</h2>
                <div className='space-y-4'>
                    {data.map((user) => (
                        <Statistics key={user.email} user={user.email} expense={user.totalExpenses} />
                    ))}
                </div>
            </div>
            <div className='flex sm:gap-6 xs:flex-col sm:flex-row justify-center items-center w-full p-4 gap-2'>
                <div className='bg-white shadow-md p-4 '>
                    <h2 className='text-xl mb-4 text-center'>Expense Categories</h2>
                    <ExpensePieChart expenseData={catArray} />
                </div>
                <div className='bg-white shadow-md p-4'>
                    <h2 className='text-xl mb-4 text-center'>Monthly Expenses</h2>
                    <MonthlyExpenseChart monthdata={monthArray} />
                </div>
            </div>
        </div>
    );
}

export default Stats_Page;

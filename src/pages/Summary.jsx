import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import axios from "axios";
import moment from "moment";
import Detail_Box from "../components/Detail_Box";

const ExpenseTable = ({isPremium,setPremium}) => {
  const [monthlyStats, setMonthlyStats] = useState({});
  const [yearlyStats, setYearlyStats] = useState([]);





 
      const handleDownloadPDF1 = () => {
        const input = document.getElementById('table1'); 
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save('downloaded-file.pdf'); 
          
        });
      }
  

        const handleDownloadPDF2 = () => {
          const input = document.getElementById('table2'); 
         
          html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('downloaded-file.pdf'); 
          });
        }



  const getStatsMonthly = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const res = await axios.post("https://spend-wise-backend-psi.vercel.app/expenses/getbyMonthGrouped",{date:new Date()}, {
        headers: { Authorization: userToken },
      });
      setMonthlyStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getStatsYearly = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const res = await axios.post("https://spend-wise-backend-psi.vercel.app/expenses/getbyYear",{date:new Date()}, {
        headers: { Authorization: userToken },
      });
      setYearlyStats(res.data.expenses);
      //setYearlyStats(res.data.Yearlyexpenses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const premiumUser = localStorage.getItem("premium");
    if (premiumUser) setPremium(true);
    getStatsMonthly();
    getStatsYearly()
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div   className="w-[50%] flex   p-2  flex-col items-center justify-center">
        <h2 className="p-2 xs:text-[13px] sm:text-[15px] font-semibold text-center">
          Monthly Expense Summary
        </h2>
        <table id="table1" className="w-full flex flex-col items-center justify-center">
          {Object.entries(monthlyStats).map(([month, expenses]) => (
            <div key={month} className="w-full flex flex-col items-center justify-center mb-4">
              <span className="text-center xs:text=[8px] text-white sm:text-[14px] m-1  font-semibold">{month}</span>
              <Detail_Box premium={isPremium} expenses={expenses} />
            </div>
          ))}
        </table>
        {(isPremium &&  monthlyStats) &&
          <button
            className="p-[2px] my-2 xs:text-[12px] sm:text-[15px] bg-green-500 text-white"
            onClick={handleDownloadPDF1}
          >
            Download
          </button>
        }
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center p-2">
        <h2 className="p-2 xs:text-[13px] sm:text-[15px] font-semibold">
          Yearly Expense Summary
        </h2>
        <table id="table2" className="w-full border-collapse table-auto">
          <thead className="w-full">
            <tr className="bg-gray-200 w-full">
              <th className="p-2 border text-white bg-[#6ed9e2] text-center xs:text-[13px] sm:text-[15px]">
                Month
              </th>
              <th className="p-2 border text-white bg-[#6ed9e2] text-center xs:text-[13px] sm:text-[15px]">
                Expenses
              </th>
            </tr>
          </thead>
          <tbody>
            {yearlyStats.map((expense) => {
              const monthYear = moment(expense.month, "YYYY-MM");
              const monthName = monthYear.format("MMMM");
              const year = monthYear.format("YYYY");
              return (
                <tr key={expense.month} className="even:bg-gray-100 w-full">
                  <td className="p-2 border bg-white text-center xs:text-[10px] sm:text-[13px]">
                    {monthName} {year}
                  </td>
                  <td className="p-2 border bg-white text-center xs:text-[10px] sm:text-[13px]">
                    {expense.totalAmount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(isPremium && yearlyStats) && (
          <button
            className="p-[2px] my-2 xs:text-[12px] sm:text-[15px] bg-green-500 text-white"
            onClick={handleDownloadPDF2}
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
        
};

export default ExpenseTable

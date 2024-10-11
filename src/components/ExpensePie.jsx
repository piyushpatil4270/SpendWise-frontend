import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpensePie = ({expenseData}) => {
  console.log("expense data is ",expenseData)
  const data = {
    labels: expenseData?.map((el)=>(el?._id?.category)),
    datasets: [
      {
        data:expenseData?.map((el)=>(el?.totalAmount)),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0']
      }
    ]
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
        }
      }
    }
  };

  return (
    <div>
    
      <div className='xs:h-[150px] sm:h-[250px] p-2'>
      <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpensePie;

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpenseBar = ({monthdata}) => {
  const data = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthdata.map((el)=>(el.expenses)),
        fill: false,
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        borderWidth: 1, 
        tension: 0.4 
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid:{
            display:false
        }
      },
      y: {
        beginAtZero: true,
        grid:{
            display:false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div>
      
      <div className='xs:h-[150px] sm:h-[250px] p-2'>
        <Line data={data} options={options}  />
      </div>
    </div>
  );
};

export default ExpenseBar;

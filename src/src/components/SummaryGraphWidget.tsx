import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface Transaction {
  transactionId: number;
  invoiceId: number;
  type: 'AR' | 'AP'; // AR for income, AP for expenditure
  transactionDate: string; // Assuming the format is 'YYYY-MM-DD'
  description: string;
  amount: number;
  creationDate: string;
  name: string;
}

interface SummaryGraphWidgetProps {
  transactions: Transaction[];
}

const SummaryGraphWidget: React.FC<SummaryGraphWidgetProps> = ({ transactions }) => {
  // Function to process transactions data and calculate daily income and expenditures
  const processDataForGraph = (transactions: Transaction[]) => {
    const dataByDate: { [key: string]: { income: number; expenditure: number; } } = {};

    transactions.forEach((transaction) => {
      const date = transaction.transactionDate;
      const amount = transaction.amount;
      if (!dataByDate[date]) {
        dataByDate[date] = { income: 0, expenditure: 0 };
      }
      if (transaction.type === 'AR') {
        dataByDate[date].income += amount;
      } else if (transaction.type === 'AP') {
        dataByDate[date].expenditure += Math.abs(amount); // Ensure expenditure is positive
      }
    });

    return Object.keys(dataByDate).map((date) => ({
      date,
      ...dataByDate[date],
    }));
  };

  const graphData = processDataForGraph(transactions);

  const data = {
    labels: graphData.map((data) => data.date),
    datasets: [
      {
        label: 'Income',
        data: graphData.map((data) => data.income),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenditure',
        data: graphData.map((data) => data.expenditure),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // SummaryGraphWidget.tsx
return (
    <div style={{ width: '400px', height: '250px', right: '100px' }}> {/* Adjust sizes as needed */}
      <Bar data={data} options={options} />
    </div>
  );
  
};

export default SummaryGraphWidget;

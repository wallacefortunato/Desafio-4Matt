import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Contract } from '../types/contract';
import { format, addMonths, startOfMonth } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsProps {
  contracts: Contract[];
}

export const Charts: React.FC<ChartsProps> = ({ contracts }) => {
  // Prepare data for expiration chart
  const next6Months = Array.from({ length: 6 }, (_, i) => 
    startOfMonth(addMonths(new Date(), i))
  );

  const expirationData = next6Months.map(month => ({
    month: format(month, 'MMM/yyyy'),
    count: contracts.filter(contract => 
      format(contract.endDate, 'MM/yyyy') === format(month, 'MM/yyyy')
    ).length
  }));

  const expirationChartData = {
    labels: expirationData.map(d => d.month),
    datasets: [
      {
        label: 'Contratos a Vencer',
        data: expirationData.map(d => d.count),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for status distribution
  const statusCount = contracts.reduce((acc, contract) => {
    acc[contract.status] = (acc[contract.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(255, 206, 86)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Contratos a Vencer</h3>
        <Bar
          data={expirationChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
          }}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Distribuição por Status</h3>
        <Pie
          data={statusChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
          }}
        />
      </div>
    </div>
  );
};
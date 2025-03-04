'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { prepareChartData } from '@/lib/surveyData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Set default options
const defaultOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};

interface SurveyChartProps {
  title: string;
  dataField: string;
  chartType?: 'bar' | 'pie' | 'doughnut';
}

export default function SurveyChart({ title, dataField, chartType = 'bar' }: SurveyChartProps) {
  const [chartData, setChartData] = useState<ChartData<'bar' | 'pie' | 'doughnut'> | null>(null);
  
  useEffect(() => {
    // Prepare chart data based on the field
    const data = prepareChartData(dataField, chartType);
    setChartData(data);
  }, [dataField, chartType]);
  
  if (!chartData) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>Loading chart data...</p>
      </div>
    );
  }
  
  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return <Pie data={chartData} options={defaultOptions} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={defaultOptions} />;
      case 'bar':
      default:
        return <Bar data={chartData} options={defaultOptions} />;
    }
  };
  
  return (
    <div className="h-full w-full">
      {renderChart()}
    </div>
  );
} 
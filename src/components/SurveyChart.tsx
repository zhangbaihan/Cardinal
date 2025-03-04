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
import API from '@/lib/api';
import { prepareChartData } from '@/lib/surveyData'; // Keep for fallback

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Try to get data from API
        const apiData = await API.analytics.getChartData(dataField);
        
        if (apiData) {
          setChartData(apiData);
        } else {
          // Fall back to synthetic data if API fails
          console.log('Falling back to synthetic data for', dataField);
          const syntheticData = prepareChartData(dataField, chartType);
          setChartData(syntheticData);
        }
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to load chart data');
        
        // Fall back to synthetic data
        const syntheticData = prepareChartData(dataField, chartType);
        setChartData(syntheticData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [dataField, chartType]);
  
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>Loading chart data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  if (!chartData) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>No data available for this chart</p>
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
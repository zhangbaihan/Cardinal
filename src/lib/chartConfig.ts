import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

// Register Chart.js components
export function registerCharts() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement, 
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  // Set default font for all charts
  ChartJS.defaults.font.family = 'Inter, sans-serif';
  
  // Set default colors that match Stanford's brand
  ChartJS.defaults.color = '#4B5563'; // Gray 600
  
  // Customize tooltip
  ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  ChartJS.defaults.plugins.tooltip.padding = 12;
  ChartJS.defaults.plugins.tooltip.cornerRadius = 6;
  ChartJS.defaults.plugins.tooltip.titleFont = { weight: 'bold', size: 14 };
  
  // Customize legend
  ChartJS.defaults.plugins.legend.position = 'top';
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  ChartJS.defaults.plugins.legend.labels.padding = 16;
}

// Initialize Chart.js when this module is imported
registerCharts(); 
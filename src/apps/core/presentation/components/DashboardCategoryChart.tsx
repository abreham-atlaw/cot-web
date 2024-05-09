import AssetCategory from '@/apps/asset/domain/models/assetCategory';
import { CategoryCount } from '@/apps/asset/infrastructure/repositories/assetCategoryRepository';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

interface Props {
  data: Map<AssetCategory, CategoryCount>;
}

// function stringToDarkColor(str: string): string {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     let color = '#';
//     for (let i = 0; i < 3; i++) {
//         let value = (hash >> (i * 8)) & 0xFF;
//         value = Math.floor(value / 2); // darken color by halving each RGB component
//         color += ('00' + value.toString(16)).substr(-2);
//     }

//     return color;
// }

const DashboardCategoryChart: React.FC<Props> = ({ data }) => {
  const labels = Array.from(data.keys()).map(category => category.name);
  const dataset = Array.from(data.values()).map(count => count.total);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Count',
        data: dataset,
        backgroundColor: 'rgba(10,60,150,0.3)',
        borderColor: 'rgba(10,60,150,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default DashboardCategoryChart;

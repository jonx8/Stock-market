import React from 'react';
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const PricesChart = (chartData: any) => {
    return (
        <Line data={chartData}/>
    );
};

export default PricesChart;
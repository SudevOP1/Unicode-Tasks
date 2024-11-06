import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const WeightsGraph = ({ weightsData }) => {

    const dates = weightsData.map(item => item.date);
    const weights = weightsData.map(item => item.weight);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: "top",
                labels: {
                    font: {
                        family: "Sans-serif",
                    },
                    color: "black",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: "Sans-serif",
                        size: 12,
                        weight: "normal"
                    },
                    color: "black",
                    display: false,
                },
                grid: {
                    display: false,
                },
                border: {
                    color: "black",
                    width: 3,
                },
            },
            y: {
                ticks: {
                    font: {
                        family: "Sans-serif",
                        size: 12,
                        weight: "normal"
                    },
                    color: "black",
                    display: false,
                },
                grid: {
                    display: false,
                },
                border: {
                    color: "black",
                    width: 3,
                },
            },
        },
    };
    

    const data = {
        labels: dates,
        datasets: [
            {
                label: "Weight",
                data: weights,
                borderColor: "black",
                cubicInterpolationMode: "monotone",
                tension: 0.4,
            },
        ],
    };

    return (
        <div style={{ height: "100%" }}>
            <Line options={options} data={data} style={{height: "100%" }} />
        </div>
    );
};

export default WeightsGraph;

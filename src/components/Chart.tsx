import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    SubTitle,
    Tooltip,
    Legend,
    Plugin,
    ChartData,
    ScriptableContext,
    Scriptable,
} from "chart.js";

const glowEffectPlugin: Plugin<"bar"> = {
    id: "glowEffect",
    beforeDraw(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const labels = chart.data.labels as string[];
        if (!labels) return;

        chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);

            interface CustomBarElement extends BarElement {
                width: number;
                height: number;
            }

            if (!meta.hidden) {
                const bar = meta.data[meta.data.length - 1] as CustomBarElement;
                ctx.save();
                ctx.shadowColor =
                    dataset.label === "Dips" ? "#D30C7B" : "#1CBAC8";

                ctx.shadowBlur = 20;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillStyle = ctx.shadowColor;
                ctx.fillRect(
                    bar.x - bar.width / 2,
                    bar.y,
                    bar.width,
                    chartArea.bottom - bar.y,
                );
                ctx.restore();
            }
        });
        const lastLabelIndex = labels.length - 1;
        const lastTickPosition =
            chart.scales.x.getPixelForValue(lastLabelIndex);

        ctx.save();
        ctx.font = "bold 14px Montserrat";
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)"; // White glow
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw the glowing label (adjust y to be just above the bar)
        ctx.fillText(
            labels[lastLabelIndex],
            lastTickPosition - 20, // Slight offset to center the text
            chartArea.bottom + 12, // Slightly above the bottom to position the label
        );
        ctx.restore();
    },
};

// Register the plugin
ChartJS.register(glowEffectPlugin);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    SubTitle,
    Tooltip,
    Legend,
);

// const createGradient = (ctx, color1, color2) => {
//     const gradient = ctx.createLinearGradient(0, 0, 0, 400);
//     gradient.addColorStop(0, color1);
//     gradient.addColorStop(1, color2);
//     return gradient;
// };

const data: ChartData<"bar", number[], string> = {
    labels: ["Now", "3 months", "6 months", "1 year"],
    datasets: [
        {
            // barPercentage: 0.8, // Shrinks bars slightly
            // categoryPercentage: 0.6, // Adds spacing between groups,
            label: "Dips",
            data: [96, 105, 114, 132],
            maxBarThickness: 50,

            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return "#D30C7B"; // Prevent errors

                const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.bottom,
                    0,
                    chartArea.top,
                );

                if (context.dataset.label === "Dips") {
                    gradient.addColorStop(0, "#D30C7B"); // Last bar different
                    gradient.addColorStop(1, "#FF66A3");
                } else {
                    gradient.addColorStop(0, "#1CBAC8"); // Last bar different
                    gradient.addColorStop(1, "#66E6F1");
                }

                return gradient;
            },
        },
        {
            label: "Pull-ups",
            data: [82, 91, 100, 118],
            maxBarThickness: 50,
            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return "#D30C7B"; // Prevent errors
                const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.bottom,
                    0,
                    chartArea.top,
                );
                if (context.dataset.label === "Dips") {
                    gradient.addColorStop(0, "#D30C7B");
                    gradient.addColorStop(1, "#FF66A3");
                } else {
                    gradient.addColorStop(0, "#1CBAC8");
                    gradient.addColorStop(1, "#66E6F1");
                }
                return gradient;
            },
        },
    ],
};

export default function Chart() {
    return (
        <div className="w-2/3 rounded-[8px] bg-gradient-to-b from-[#062A2D] to-[#30031C] overflow-hidden">
            <Bar
                className={`bg-[rgba(18,18,18,0.75)] text-black`}
                options={{
                    aspectRatio: 0.75,
                    color: "white",

                    layout: {
                        padding: 20,
                    },

                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                        },
                        title: {
                            color: "#E0E0E0",

                            display: true,
                            text: "Dips & Pull-ups Strength",
                            font: {
                                family: "Montserrat",
                                size: 20,
                                weight: "bold",
                            },
                        },
                        subtitle: {
                            display: true,
                            text: "Your projected strength growth over time",
                            font: {
                                family: "Montserrat",
                                size: 14,
                                weight: 400,
                            },
                            color: "#B0B0B0", // Lighter grey to contrast title
                        },
                        tooltip: {
                            enabled: true,
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            titleFont: {
                                family: "Roboto, 'Helvetica', 'Arial', sans-serif",
                                size: 14,
                                weight: "bold",
                            },
                            bodyFont: {
                                family: "Montserrat, 'Helvetica', 'Arial', sans-serif",
                                size: 12,
                            },
                            padding: 10,
                            displayColors: false,
                            callbacks: {
                                label: (context) => {
                                    let value = context.raw; // Get the value
                                    return `Power: ${value}`; // Show "Power: X"
                                },
                            },
                        },
                    },
                    scales: {
                        y: {
                            grid: {
                                color: "rgba(211, 12, 123, 0.2)", // Cyan gridline
                                lineWidth: 1.5, // Adjust line width
                                drawOnChartArea: true, // Draw gridlines on the chart area
                                // drawTicks: false, // Hide ticks
                            },
                            min: 50,
                            max: 150,
                        },
                        x: {
                            grid: {
                                color: "rgba(0, 255, 255, 0.2)", // Pink gridline
                                lineWidth: 1.5, // Adjust line width
                                drawOnChartArea: true, // Draw gridlines on the chart area
                                drawTicks: false, // Hide ticks
                            },
                            ticks: {
                                font: {
                                    family: "Montserrat",
                                    size: 14,
                                    weight: "bold",
                                },
                                color: [
                                    "#E0E0E0",
                                    "#E0E0E0",
                                    "#E0E0E0",
                                    "white",
                                ],
                            },
                        },
                    },
                }}
                data={data}
            />
        </div>
    );
}

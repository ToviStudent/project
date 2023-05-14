import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";

export default function YearView() {
  const [date, setDate] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "incomes",
          data: [65, 59, 80, 81, 56, 55, 40, 10, 10, 10, 10, 10],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
        {
          label: "exppenses",
          data: [28, 48, 40, 19, 86, 27, 90, 45, 34, 23, 12, 23],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <Card className="md:w-25rem">
      <div className="card">
        <div className="card flex justify-content-center">
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            view="year"
            dateFormat="yy"
          />
        </div>
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
}

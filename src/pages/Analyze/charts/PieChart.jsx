import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const PieChart = ({data, width}) => {
    
    const options = {
        series: Object.values(data),
        chart: {
          width: 300,
          type: 'pie',
        },
        fill: {
            type: 'gradient',
        },
        labels: Object.keys(data),
        responsive: [{
          breakpoint: 250,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }


    return (
        <div className="mixed-chart">
            <Chart
                options={options}
                series = {options.series}
                type="pie"
                width={width}
            />
        </div>
    );
}
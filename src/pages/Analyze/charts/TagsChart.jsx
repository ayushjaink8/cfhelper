import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const TagsChart = ({TagsData, width}) => {

    const options = {
        series: Object.values(TagsData),
        chart: {
          width: 300,
          type: 'donut',
        },
        fill: {
            type: 'gradient',
        },
        labels: Object.keys(TagsData),
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
                type="donut"
                width={width}
            />
        </div>
    );
}
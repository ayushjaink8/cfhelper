import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const ColumnChart = ({ColumnData, width}) => {

    const options = {
        series: [{
            name: "Problems Solved",
            data: Object.values(ColumnData)
          }],

            chart: {
              height: 350,
              type: 'bar',

            },
            labels: Object.keys(ColumnData),
            plotOptions: {
              bar: {
                columnWidth: '55%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: true
            },
            legend: {
              show: true
            },
            xaxis: {
              categories: Object.keys(ColumnData),
            }
      }


    return (
        <div className="mixed-chart">
            <Chart
                options={options}
                series = {options.series}
                type="bar"
                width={width}
            />
        </div>
    );
}
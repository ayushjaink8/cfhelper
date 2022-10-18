import React, { Component } from "react";
import {ReactApexChart} from "react-apexcharts";

const ApexChart = ({options, series, type, width}) => {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type={type}
              width={width}
            />
          </div>
        </div>
      </div>
    );
}

export default ApexChart;
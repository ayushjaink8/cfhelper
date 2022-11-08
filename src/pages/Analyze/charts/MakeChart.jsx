import React from "react";
import { PieChart } from "./PieChart";
import { TagsChart } from "./TagsChart";
import { ColumnChart } from "./ColumnChart";

import userDataService from "../../../data/userDataService";

const MakeChart = ({ userData, tableData }) => {

  const getLink = (code) => {
    return (
      <>
        <a
          className="text-purple-700"
          href={userDataService.Get_url(code)}
          target="blank"
        >
          ({code})
        </a>
      </>
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-flow-row-dense grid-cols-12  gap-5">
          <div className="col-span-6">
            <div className="block p-6 rounded-lg shadow-lg bg-white">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Languages Used
              </h5>
              <div className="text-gray-700 text-base mb-4">
                <PieChart data={userData.langs} width={528} />
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <div className="block p-6 rounded-lg shadow-lg bg-white">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Verdicts
              </h5>
              <div className="text-gray-700 text-base mb-4">
                <PieChart data={userData.verdicts} width={600} />
              </div>
            </div>
          </div>

          <div className="col-span-2"></div>
          <div className="col-span-8">
            <div className=" block p-6 rounded-lg shadow-lg bg-white">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Tags Solved
              </h5>
              <div className=" text-gray-700 text-base mb-4">
                <TagsChart TagsData={userData.tags} width={800} />
              </div>
            </div>
          </div>
          <div className="col-span-2"></div>

          <div className="col-span-6">
            <div className="block p-6 rounded-lg shadow-lg bg-white">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Levels
              </h5>

              <div className="text-gray-700 text-base mb-4">
                <ColumnChart ColumnData={userData.levels} width={600} />
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <div className="block p-6 rounded-lg shadow-lg bg-white">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Problem Ratings
              </h5>

              <div className="text-gray-700 text-base mb-4">
                <ColumnChart ColumnData={userData.ratings} width={600} />
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <div className="block p-6 rounded-lg shadow-lg bg-white">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-4">
                Current Statistics
              </h5>

              <div className="grid grid-cols-12 text-gray-700 text-base mb-4">
                <div className="col-span-6 overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500">
                    <tbody>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"> {" "} Tried {" "} </th>
                        <td className="py-4 px-6"> {tableData.tried} </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{" "}Solved{" "}</th>
                        <td className="py-4 px-6"> {tableData.solved} </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {" "}Average attempts{" "}
                        </th>
                        <td className="py-4 px-6">
                          {" "}{(userData.totalSub / tableData.solved).toFixed(2)}{" "}
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {" "}Max attempts{" "}
                        </th>
                        <td className="py-4 px-6">
                          {" "}{tableData.maxAttempt}{" "}{getLink(tableData.maxAttemptProblem)}{" "}
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                          {" "}Solved with one submission{" "}
                        </th>
                        <td className="py-4 px-6">
                          {" "}{tableData.solvedWithOneSub}{" "}
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {" "}Max attempts{" "}
                        </th>
                        <td className="py-4 px-6">
                          {" "}{tableData.maxAc} {getLink(tableData.maxAcProblem)}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-span-6 overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500">
                    <tbody>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {" "}Contests Given{" "}
                        </th>
                        <td className="py-4 px-6"> {tableData.tot} </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {" "}Best rank{" "}
                        </th>
                        <td className="py-4 px-6">
                          {" "}{tableData.best} {getLink(tableData.bestCon)}{" "}
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {" "}Worst rank{" "}
                        </th>
                        <td className="py-4 px-6">
                          {" "}
                          {tableData.worst} {getLink(tableData.worstCon)}{" "}
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {" "}Max rating up{" "}
                        </th>
                        <td className="py-4 px-6">
                          {" "}{tableData.maxUp} {getLink(tableData.maxUpCon)}{" "}
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {" "}Max rating down{" "}
                        </th>
                        <td className="py-4 px-6">
                          {" "}{tableData.maxDown} {getLink(tableData.maxDownCon)}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2"></div>
          <div className="col-span-8">
            <div className=" block p-6 rounded-lg shadow-lg bg-white">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Unsolved Problems
              </h5>
              <div className=" text-grey-700 text-base mb-4">
                {tableData.unsolved.map((probCode, i) => {
                  return (
                    <span key={i}>
                      {getLink(probCode)}{`  `}{" "}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </>
  );
};

export default MakeChart;

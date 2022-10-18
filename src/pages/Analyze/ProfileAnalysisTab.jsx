import React, { useEffect, useState } from "react";

import userDataService from "../../data/userDataService";
import MakeChart from "./charts/MakeChart";

const ProfileAnalysisTab = () => {

  const [user, setUser] = useState("");
  const [userErr, setUserErr] = useState("");
  const [userData, setUserData] = useState(null);
  const [tableData, setTableData] = useState(null);

  const loadUser = async () => {
    try {

      setUserErr("");

      const userDataRes = await userDataService.fetchUserData(user);
      const tableDataRes = await userDataService.fetchTableData(user);
      
      if(userDataRes.status === "OK" && tableDataRes.status === "OK"){
        // console.log(userDataRes.result);
        // console.log(tableDataRes.result);
        var data = userDataService.computeData(userDataRes.result);
        setUserData(data);
        var data2 = userDataService.computeTableData(tableDataRes.result, data.problems)
        setTableData(data2);
      } else if(userDataRes.status === "FAILED"){
        setUserErr(userDataRes.error);
      } else if(tableDataRes.status === "FAILED"){
        setUserErr(tableDataRes.error)
      } else {
        setUserErr("Codeforces API not responding.")
      }
      
    } catch (err) {
      setUserData(null);
      setUserErr(`Codeforces error: "${err.response.data.comment}"`);
    }
  };

  return (
    <>
      <div className="w-full h-full px-2 py-4 md:px-4 md:py-6 lg:p-16">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="container-fluid">
            <div className="mb-3 row text-center justify-content-center">
              <div className="col-auto">
                <input
                  type="text"
                  placeholder="Search CF Handle"
                  className="form-control"
                  id="inputPassword"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") loadUser();
                  }}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={loadUser}>
                  <i className="bi bi-search"></i> Search
                </button>
              </div>
            </div>

            {userErr && (
              <div className="row justify-content-center m-1 text-danger">
                {userErr}
              </div>
            )}
            

            {/* Create Charts! */}

            { (userData && tableData) && <MakeChart userData={userData} tableData={tableData} /> }
            

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileAnalysisTab;

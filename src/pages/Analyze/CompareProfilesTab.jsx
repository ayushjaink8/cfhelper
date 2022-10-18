import React, { useState, useEffect } from "react";

import userDataService from "../../data/userDataService";

const CompareProfilesTab = () => {

  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [Err, setErr] = useState("");
  const [userData, setUserData] = useState(null);
  const [tableData, setTableData] = useState(null);

  const loadData = async () => {
    try {

      setErr("");

      const userDataRes = await userDataService.fetchDoubleUsersData(user1);
      // const tableDataRes = await userDataService.fetchTableData(user1);
      
      if(userDataRes.status === "OK"){
        // console.log(userDataRes.result);
        // console.log(tableDataRes.result);
        // var data = userDataService.computeData(userDataRes.result);
        // setUserData(data);
        // var data2 = userDataService.computeTableData(tableDataRes.result, data.problems)
        // setTableData(data2);
      } else if(userDataRes.status === "FAILED"){
        setErr(userDataRes.error);
      } else {
        setErr("Codeforces API not responding at the moment.")
      }
      
    } catch (err) {
      setUserData(null);
      setErr(`Codeforces error: "${err.response.data.comment}"`);
    }
  };


    return (
      <div>
        <div className="w-full h-full px-2 py-4 md:px-4 md:py-6 lg:p-16">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="container-fluid">


            <div className="mb-3 row text-center justify-content-center">
              <div className="col-auto">
                <input
                  type="text"
                  placeholder="Search CF Handle 1"
                  className="form-control"
                  id="CFhandleInput"
                  value={user1}
                  onChange={(e) => setUser1(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  placeholder="Search CF Handle 2"
                  className="form-control"
                  id="CFhandleInput"
                  value={user2}
                  onChange={(e) => setUser2(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={loadData}>
                  <i className="bi bi-people"></i> Compare
                </button>
              </div>
            </div>




            </div>
          </div>
        </div>
      </div>
    );
}

export default CompareProfilesTab;

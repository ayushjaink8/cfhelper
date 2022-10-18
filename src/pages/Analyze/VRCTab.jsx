import React, { useState } from "react";
import codeforcesService from "../../data/codeforcesService";
import RatingChangeTable from "../../components/RatingChangeTable";

const VRCTab = () => {


  const [contest, setContest] = useState("");
  const [contestErr, setContestErr] = useState("");
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);



  const loadRating = async () => {
    try {

      setLoading(true);
      setContestErr("");
      setTableData(null);
      const tableDataRes = await codeforcesService.getRatingChangeData(contest);
      setLoading(false);

      if(tableDataRes.status === "OK"){
        setTableData(tableDataRes.data);
      } else if(tableDataRes.status === "FAILED"){
        setContestErr(tableDataRes.error);
      } else {
        setContestErr("Codeforces API not responding.")
      }
      
    } catch (err) {
      setTableData(null);
      setContestErr(`Codeforces error: "${err.response.data.comment}"`);
    }
  };




  return (
    <div>
      <div className="w-full h-full min-w-min px-2 py-4 md:px-4 md:py-6 lg:p-16">
        <div className="flex item-center justify-center gap-4 flex-wrap">
          <div className="container-fluid">

            <div className="mb-3 row text-center justify-content-center">
              <div className="col-auto">
                <input
                  type="text"
                  placeholder="Enter Contest ID"
                  className="form-control"
                  id="inputContestID"
                  // value={contest}
                  onChange={(e) => {
                    e.preventDefault();
                    setContest(e.target.value)}
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") loadRating();
                  }}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={loadRating}>
                  <i className="bi bi-cpu"></i> Get Predictions
                </button>
              </div>
            </div>


            {loading && (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}


            {contestErr && (
              <div className="row justify-content-center m-1 text-danger">
                {contestErr}
              </div>
            )}

              

            {tableData && (
              <div>
                <RatingChangeTable tableData={tableData} />
              </div>
            )}


        
          </div>
        </div>
      </div>
    </div>
  );
}


export default VRCTab;

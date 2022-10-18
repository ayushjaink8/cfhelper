import React, {useState} from "react";

const RatingChangeTable = ({ tableData }) => {

  
  const [filteredTableData, setFilteredTableData] = useState(tableData);
  const [searchHandle, setSearchHandle] = useState("");
  
  const filterTable = () => {

    if(tableData){

      const filteredData = tableData.filter(
        (entry) => {
          if(searchHandle===''){
            return true;
          }
          else{
            return entry.handle.toLowerCase().includes(searchHandle.toLowerCase());
          }
        }
      );

      setFilteredTableData(filteredData);
    }

  }

  return (
    <>

      <div>
        <div className="mb-3 mt-2 row text-center justify-content-center">
          <div className="col-auto">
            <input
              type="text"
              placeholder="Search Handle"
              id="searchHandle"
              value={searchHandle}
              onChange={(e) => {
                e.preventDefault();
                setSearchHandle(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") filterTable();
              }}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={filterTable}>
              <i className="bi bi-search"></i> Search Handle
            </button>
          </div>
        </div>
      </div>

      
      <div className="overflow-x-auto min-w-min  relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

              <th scope="col" className="text-left py-3 px-6">
                Codeforces Handle
              </th>
              <th scope="col" className="py-3 px-6">
                Rating Change
              </th>
              <th scope="col" className="py-3 px-6">
                Expected Rank
              </th>
              <th scope="col" className="py-3 px-6">
                Rank Obtained
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredTableData?.map((item) => 
              <tr key={item.handle} id={item.handle}
                className= {"border-b font-bold " + ((item.delta<0) ? "bg-red-50" : "bg-green-50")}
              >
                <th scope="row" className="py-4 px-6 text-left text-gray-900 whitespace-nowrap">

                  <a
                    className="text-purple-900"
                    href={"https://codeforces.com/profile/"+item.handle}
                    target="blank"
                  >
                    {item.handle}
                  </a>
                  
                </th>
                <td className={"py-4 px-6 " + ((item.delta<0) ? "text-red-800" : "text-green-800")}>{item.delta}</td>
                <td className="py-4 px-6">{item.seed}</td>
                <td className="py-4 px-6">{item.rank}</td>
              </tr>
            )}


          </tbody>
        </table>
        {(filteredTableData.length === 0) && (
          <div className="text-center m-2 font-bold text-grey-100">
            No Handles
          </div>
        )}
      </div>
    </>
  );
};

export default RatingChangeTable;

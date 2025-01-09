import React from "react";

function Resourses({ data }) {
  return (
    <div className="flex flex-col gap-6">
      <div className=" hidden bg-[#758dc4] w-[21vw] text-[12px] shadow-lg font-[500]  h-[25vh] sm:w-[31vw] sm:flex text-white items-center p-4 text-center  ">
        {data.text}
      </div>
      {/* <p className="bg-blue-200 h-[10vh] w-[40vw]  ">{data.text2}</p>
      <p className="bg-blue-100 h-[20vh] w-[40vw]  ">{data.text3}</p> */}
    </div>
  );
}

export default Resourses;

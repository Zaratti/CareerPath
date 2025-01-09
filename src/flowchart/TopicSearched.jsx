import React, { useContext } from "react";
import { Handle, Position } from "reactflow";
import { GlobalContext } from "../context/GlobalContex";

function TopicSearched({ data }) {
  const { selectedLabel } = useContext(GlobalContext);
  return (
    <div className="bg-[#758dc4] w-[10vw] text-[12px] flex items-center  justify-center text-white rounded-[8px] sm:w-[20vw]  h-[14vh] p-3">
      {data.text}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default TopicSearched;

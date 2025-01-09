import React from "react";
import { Handle, Position } from "reactflow";

function OutPut3({ data }) {
  return (
    <div className="w-[100px] text-[10px] sm:w-[300px] h-[60px] flex  items-center border-[2px] shadow-lg border-black p-3 fony-[800]  rounded-[10px] bg-[#fae29c]  ">
      <Handle type="source" position={Position.Right} />
      {data.text}
    </div>
  );
}

export default OutPut3;

import React from "react";
import { Handle, Position } from "reactflow";

function School({ data }) {
  return (
    <div className="w-[130px]  sm:w-[350px] h-[80px] flex items-center border-[2px] border-black p-3 fony-[800]  rounded-[10px] bg-[#fae29c]  ">
      <Handle type="target" position={Position.Left} />
      {data.text}
    </div>
  );
}

export default School;

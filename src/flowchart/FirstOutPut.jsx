import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContex";
import { Handle, Position } from "reactflow";

function FirstOutPut({ data }) {
  return (
    <div
      className="w-[110px] text-[10px]  sm:w-[20vw] text-[#10182c] h-[20vh] sm:h-[14vh] flex items-center justify-center "
      style={{
        backgroundColor: "#f0d318",
        borderRadius: "8px",
        border: "3px solid black",
      }}
      onClick={data.onClick}
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <p className="text-center text-[15px] font-[600] ">{data.text}</p>
    </div>
  );
}

export default FirstOutPut;

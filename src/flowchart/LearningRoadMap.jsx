import React, { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { GlobalContext } from "../context/GlobalContex";
import FirstOutPut from "./FirstOutPut";
import OutPut3 from "./OutPut3";
import School from "./School";
import Resourses from "./Resourses";
import TopicSearched from "./TopicSearched";
import { useNavigate } from "react-router-dom";







  const nodeTypes = {
    firstOutPut: FirstOutPut,
    coursesdisplay: OutPut3,
    displayschool: School,
    resourses: Resourses,
    topic: TopicSearched,
    // Using the actual component for the node type
  };

function LearningRoadMap() {
  const {
    responseGenarated,

    setSelectedLabel,

    callMoreResearch,
    newresharchResponse,
    setIsLableEmpty,
    questionModal,
    setQuestionModal,
    handleGenerateQuestion,
  } = useContext(GlobalContext);
const [isModel,setIsModel]=useState(false)
const [loading,setloading]=useState(false)

// console.log(newresharchResponse);

const navigate = useNavigate();

const handleQuestion =()=>{
  handleGenerateQuestion()
  setQuestionModal(true)
  navigate("/quiz")
}

const handleNodeClick = (value) => {
  setIsLableEmpty(true)
  setSelectedLabel(value);
  setIsModel(true)
  setloading(true)
  callMoreResearch() 

  
setIsModel(true);
   setloading(true); // Start loading when a node is clicked
   callMoreResearch(); 
};

useEffect(() => {
  if (newresharchResponse.length > 0) {
    setloading(false); // Stop loading when data is received
  }
}, [newresharchResponse]);




const getXPosition = () => {
  if (window.innerWidth > 1200) {
    return 500; // Position for larger screens
  } else if (window.innerWidth > 768) {
    return 800; // Position for medium screens
  } else {
    return 120; // Position for smaller screens
  }
};

const getXPositionSchool = () => {
  if (window.innerWidth > 1200) {
    return 1000; // Position for larger screens
  } else if (window.innerWidth > 768) {
    return 1000; // Position for medium screens
  } else {
    return 250; // Position for smaller screens
  }
};

// const Output = newresharchResponse[newresharchResponse.length - 1];

  const initialNodes = responseGenarated.flatMap((el, index) => [
    {
      id: `result-${10}`,
      type: "topic",
      data: {
        text: (
          <div>
            <p>Tech Road Map</p>
          </div>
        ),
      },
      position: { x: getXPosition(), y: -200 },
    },
    {
      id: `${el.id}`,
      type: "firstOutPut",
      data: { text: el.Courses, onClick: () => handleNodeClick(el.Courses) },
      position: { x: getXPosition(), y: 10 + index * 200 },
    },

    {
      id: `Learn-${el.id}`,
      type: "coursesdisplay",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.Learn[0])}>{el.Learn[0]}</p>
          </div>
        ),
      },
      position: { x: 1, y: 8 + index * 200 },
    },
    {
      id: `Learn2-${el.id}`,
      type: "coursesdisplay",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.Learn[1])}>{el.Learn[1]}</p>
          </div>
        ),
      },
      position: { x: 1, y: 70 + index * 200 },
    },
    {
      id: `Learn3-${el.id}`,
      type: "coursesdisplay",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.Learn[2])}>{el.Learn[2]}</p>
          </div>
        ),
      },
      position: { x: 1, y: 132 + index * 200 },
    },

    {
      id: `School1-${el.id}`,
      type: "displayschool",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.School[0])}>{el.School[0]}</p>
          </div>
        ),
      },
      position: { x: getXPositionSchool(), y: 5 + index * 200 },
    },
    {
      id: `School2-${el.id}`,
      type: "displayschool",
      data: {
        text: (
          <div>
            <p onClick={() => handleNodeClick(el.School[1])}>{el.School[1]}</p>
          </div>
        ),
      },
      position: { x: getXPositionSchool(), y: 100 + index * 200 },
    },
    {
      id: `Resourse1-${20}`,
      type: "resourses",
      data: {
        text: (
          <div>
            <p>Make Sure To Learn "Beginener " topics of all Tech Skills</p>
          </div>
        ),
      },
      position: { x: getXPositionSchool(), y: -200 },
    },
  ]);

  
  const initialEdges = responseGenarated.flatMap((el) => [
    {
      id: `e-school1-${el.id}`,
      source: `${el.id}`,
      target: `School1-${el.id}`,
      animated: true,
    },
    {
      id: `e-school2-${el.id}`,
      source: `${el.id}`,
      target: `School2-${el.id}`,
      animated: true,
    },
    {
      id: `e-school3-${el.id}`,
      source: `${el.id}`,
      target: `School3-${el.id}`,
      animated: true,
    },
    {
      id: `Learn-${el.id}`,
      source: `Learn-${el.id}`,
      target: `${el.id}`,
      // animated: true,
    },
    {
      id: `Learn2-${el.id}`,
      source: `Learn2-${el.id}`,
      target: `${el.id}`,
      // animated: true,
    },
    {
      id: `Learn3-${el.id}`,
      source: `Learn3-${el.id}`,
      target: `${el.id}`,
      // animated: true,
    },
    // {
    //   id: `result-${10}`,
    //   source: `result-${10}`,
    //   target: `${0}`,
    //   // animated: true,
    // },
  ]);

// const handleQUESTION =()=>{

// }


  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div>
      <div className="h-screen  w-screen mb-24 bg-[#fffefe]   ">
        <div className="h-[10vh]  px-10 sticky top-0 bg-[#0f172a] z-20 text-yellow-50 flex items-center justify-between  ">
          <p>Tech RoadMap</p>
          <a href="https://tech-quiz-gxmx.vercel.app/?vercelToolbarCode=1Iqfb5DbSiEhhQs">
            Take A Quiz
          </a>
        </div>
        <div className="h-[200vh] overflow-auto  w-[100vw] bg-[#0f172a] ">
          <ReactFlow
            // style={{
            //   height: "300vh",
            //   overflow: "auto",
            //   width: "100vw",
            //   backgroundColor: "pink",
            // }}
            nodes={initialNodes}
            edges={initialEdges}
            // onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            preventScrolling={false}
            nodeTypes={nodeTypes}
            panOnScroll={false}
            zoomOnScroll={false} // Prevents zooming with scroll
            zoomOnPinch={false} // Prevents zooming with pinch gestures
            fitView
          >
            {/* <Background /> */}
          </ReactFlow>
        </div>
        <div className=" flex h-[20vh] sm:h-[40vh]  w-[100vw] items-center bg-[#758dc4] justify-center">
          <div className="h-[10vh] sm:h-[20vh] w-[100vw] ">
            <h2 className="text-center text-[20px] sm:text-[50px] font-[800]">
              Join the Community
            </h2>
            <p className="text-center font-[300] ">
              roadmap <span className="underline">is our 2nd project</span>
            </p>
          </div>
        </div>
        <div className=" bg-[#0f172a] flex justify-center items-center  h-[40vh] w-[100vw] text-yellow-50">
          <div className="sm:h-[20vh] px-2 sm:px-0 sm:w-[70vw] grid grid-cols-1 sm:grid-cols-2 ">
            <div>
              <h2>RoadMap tech Genarator</h2>

              <p> Community created roadmaps, best practices, projects,</p>
              <p>articles, resources and journeys to help you choose your</p>
              <p> path and grow in your career.</p>
            </div>
            <div>
              <h2 className="sm:text-end">TheNewStack</h2>
              <p className="sm:text-end">
                The top resource from Osonwa Precious
              </p>
              <p className="sm:text-end">frontEnd Developer</p>
              <p className="sm:text-end">development and deploment</p>
            </div>
          </div>
        </div>
      </div>

      {isModel && (
        <div className="h-[100vh] removescrollbar z-50 px-2 py-5  overflow-y-scroll w-[100vw] sm:w-[40vw] shadow-lg bg-white  fixed top-0 right-0">
          {!loading ? (
            <div>
              <div
                onClick={() => setIsModel(false)}
                className="right-5 h-[20px] w-[20px] top-1 fixed flex items-center justify-center  text-red-600 bg-red-100 rounded-[100%]"
              >
                <p>x</p>
              </div>

              <div>
                {newresharchResponse.map((item) => (
                  <div key={item.key}>
                    {item.type === "heading" ? (
                      <h2 className="font-[900] text-center text-[18px] text-black mb-1  ">
                        {item.text}
                      </h2>
                    ) : item.type === "subheading" ? (
                      <h3 className=" p-1 text-start my-1 font-[600]    bg-transparent   text-[12px] ">
                        {item.text}
                      </h3>
                    ) : item.type === "boldText" ? (
                      <h3 className=" p-2  text-[15px] border-[3px] border-green-300 ">
                        {item.text}
                      </h3>
                    ) : (
                      <p className="text-[11px] font-[500] ">{item.text}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-1">
                <p
                  onClick={handleQuestion}
                  className="text-blue-600 text-[13px] "
                >
                  Take A Quiz
                </p>
              </div>
            </div>
          ) : (
            <div className=" flex items-center justify-center h-[100vh] bg-[rgba(0,0,0,0.1)]  ">
              <CircularProgress size={84} color="inherit" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}


export default LearningRoadMap;
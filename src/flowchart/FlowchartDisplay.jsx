// import React, { useContext } from "react";
// import ReactFlow, { Controls, Background } from "reactflow";
// import "reactflow/dist/style.css"; // Make sure to include this for proper styling
// import { GlobalContext } from "../context/GlobalContex";

// export default function FlowChart() {
//   const { responseGenarated } = useContext(GlobalContext);

//   // Generate nodes from the response data
//   const nodes = responseGenarated.flatMap((step, index) => [
//     {
//       id: `step-${index}`, // Unique ID for each step node
//       position: { x: 50, y: index * 200 }, // Position based on index
//       data: {
//         label: (
//           <div
//             style={{
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "5px",
//               backgroundColor: "lightblue",
//             }}
//           >
//             <h3>{step.Steps}</h3>
//           </div>
//         ),
//       },
//     },
//     {
//       id: `description-${index}`, // Unique ID for each description node
//       position: { x: 300, y: index * 400 }, // Position to the right of the step node
//       data: {
//         label: (
//           <div
//             style={{
//               border: "1px solid #007bff",
//               borderRadius: "5px",
//               padding: "10px",
//               margin: "10px 0",
//               width: "40vw",
//             }}
//           >
//             <strong>Description:</strong>
//             <ul>
//               {step.description.map((desc, idx) => (
//                 <li key={idx}>{desc}</li>
//               ))}
//             </ul>
//           </div>
//         ),
//       },
//     },
//     {
//       id: `advice-${index}`, // Unique ID for each advice node
//       position: { x: 600, y: index * 620 }, // Position to the right of the description node
//       data: {
//         label: (
//           <div
//             style={{
//               border: "1px solid #007bff",
//               borderRadius: "5px",
//               padding: "10px",
//               margin: "10px 0",
//               width: "40vw",
//             }}
//           >
//             <strong>Advice:</strong> {step.advice}
//           </div>
//         ),
//       },
//     },
//   ]);

//   // Generate edges to connect nodes
//   const edges = nodes.flatMap((node, index) => {
//     const edgesArray = [];
//     if (index % 3 === 0 && index + 1 < nodes.length) {
//       edgesArray.push({
//         id: `edge-step-${index}`,
//         source: node.id,
//         target: nodes[index + 1].id, // Connect to description
//         animated: true,
//       });
//     }
//     if (index % 3 === 1 && index + 1 < nodes.length) {
//       edgesArray.push({
//         id: `edge-desc-${index}`,
//         source: node.id,
//         target: nodes[index + 1].id, // Connect to advice
//         animated: true,
//       });
//     }
//     return edgesArray;
//   });

//   return (
//     <div className="h-[100vh] w-[100vw]">
//       <ReactFlow nodes={nodes} edges={edges}>
//         <Controls />
//         <Background />
//         <Background color="#aaa" gap={16} />
//       </ReactFlow>
//     </div>
//   );
// }

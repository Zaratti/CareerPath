import React, { useContext, useState } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { GlobalContext } from "../context/GlobalContex";

export default function FlowChart() {
  const { responseGenarated } = useContext(GlobalContext);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [expandedControl, setExpandedControl] = useState({});
  const [expandedAdvice, setExpandedAdvice] = useState({});

  const toggleDescription = (descriptionId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [descriptionId]: !prev[descriptionId],
    }));
  };

  const toggleControl = (controlId) => {
    setExpandedControl((prev) => ({
      ...prev,
      [controlId]: !prev[controlId],
    }));
  };

  const toggleAdvice = (adviceId) => {
    setExpandedAdvice((prev) => ({
      ...prev,
      [adviceId]: !prev[adviceId],
    }));
  };

  const nodes = responseGenarated.flatMap((step, index) => {
    const yOffset = 200;
    const baseX = index * 300;
    const baseY = 50;

    const stepId = `step-${index}`;
    const descriptionId = `description-${index}`;
    const controlId = `control-${index}`;
    const adviceId = `advice-${index}`;

    const stepNode = {
      id: stepId,
      position: { x: baseX, y: baseY },
      data: {
        label: (
          <div
            onClick={() => toggleDescription(descriptionId)}
            style={{
              padding: "10px",
              backgroundColor: "lightblue",
              cursor: "pointer",
              borderRadius: "5px",
              border: "1px solid #007bff",
              width: "20em",
              textAlign: "center",
            }}
          >
            <h3>{step.Courses}</h3>
          </div>
        ),
      },
    };

    const descriptionNode = expandedDescriptions[descriptionId]
      ? {
          id: descriptionId,
          position: { x: baseX, y: baseY + yOffset },
          data: {
            label: (
              <div
                onClick={() => toggleControl(controlId)}
                style={{
                  padding: "10px",
                  backgroundColor: "lightyellow",
                  borderRadius: "5px",
                  border: "1px solid #007bff",
                  cursor: "pointer",
                  width: "80em",
                  textAlign: "left",
                  overflowWrap: "break-word",
                }}
              >
                <strong>Description:</strong>
                <ul>
                  {step.Learn.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ),
          },
        }
      : null;

    const controlNode =
      expandedControl[controlId] && expandedDescriptions[descriptionId]
        ? {
            id: controlId,
            position: { x: baseX, y: baseY + yOffset * 2 },
            data: {
              label: (
                <div
                  onClick={() => toggleAdvice(adviceId)}
                  style={{
                    padding: "10px",
                    backgroundColor: "lightcoral",
                    borderRadius: "5px",
                    border: "1px solid #007bff",
                    cursor: "pointer",
                    width: "80em",
                    textAlign: "left",
                    overflowWrap: "break-word",
                  }}
                >
                  <strong>Control:</strong>
                  <ul>
                    {step.Course.map((ctrl, idx) => (
                      <li key={idx}>{ctrl}</li>
                    ))}
                  </ul>
                </div>
              ),
            },
          }
        : null;

    const adviceNode =
      expandedAdvice[adviceId] && expandedControl[controlId]
        ? {
            id: adviceId,
            position: { x: baseX, y: baseY + yOffset * 3 },
            data: {
              label: (
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "lightgreen",
                    borderRadius: "5px",
                    border: "1px solid #007bff",
                    width: "50em",
                    textAlign: "left",
                    overflowWrap: "break-word",
                  }}
                >
                  <strong>Schols:</strong>
                  <ul>
                    {step.School.map((sch, idx) => (
                      <li key={idx}>{sch}</li>
                    ))}
                  </ul>
                </div>
              ),
            },
          }
        : null;

    return [stepNode, descriptionNode, controlNode, adviceNode].filter(Boolean);
  });

  const edges = nodes
    .flatMap((node, index) => {
      const stepId = `step-${index}`;
      const descriptionId = `description-${index}`;
      const controlId = `control-${index}`;
      const adviceId = `advice-${index}`;

      return [
        expandedDescriptions[descriptionId] && {
          id: `edge-step-desc-${index}`,
          source: stepId,
          target: descriptionId,
          animated: true,
        },
        expandedControl[controlId] && {
          id: `edge-desc-ctrl-${index}`,
          source: descriptionId,
          target: controlId,
          animated: true,
        },
        expandedAdvice[adviceId] && {
          id: `edge-ctrl-adv-${index}`,
          source: controlId,
          target: adviceId,
          animated: true,
        },
      ].filter(Boolean);
    })
    .filter(Boolean);

  return (
    <div>
      {responseGenarated.length === 0 ? (
        <div className="h-[100vh] flex items-center justify-center">
          <p className="text-red-400 text-[20px] font-medium">
            No data generated yet. Check internet connection or refresh page.
          </p>
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            height: "100vh",
            background: "black",
          }}
        >
          <ReactFlow nodes={nodes} edges={edges}>
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      )}
    </div>
  );
}

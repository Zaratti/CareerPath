const { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState } = ReactFlow;

const initialNodes = [
    { id: '1', position: { x: 250, y: 5 }, data: { label: 'Start: Career Goal' } },
    { id: '2', position: { x: 100, y: 100 }, data: { label: 'Step 1: Learn Python Basics' } },
    { id: '3', position: { x: 400, y: 100 }, data: { label: 'Step 2: Learn Web Development' } },
    { id: '4', position: { x: 250, y: 200 }, data: { label: 'Step 3: Build Projects' } },
    { id: '5', position: { x: 250, y: 300 }, data: { label: 'Step 4: Apply for Jobs' } }
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' }
];

function Flowchart() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return React.createElement(
        'div',
        { style: { width: '100%', height: '500px' } },
        React.createElement(ReactFlow, {
            nodes,
            edges,
            onNodesChange,
            onEdgesChange,
            fitView: true,
            children: [
                React.createElement(MiniMap, { key: 'minimap' }),
                React.createElement(Controls, { key: 'controls' }),
                React.createElement(Background, { variant: 'dots', gap: 12, size: 1, key: 'background' })
            ]
        })
    );
}

// Render the React Flow chart
ReactDOM.render(
    React.createElement(Flowchart),
    document.getElementById('flowchart')
);

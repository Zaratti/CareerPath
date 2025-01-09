import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
// import FlowchartDisplay from './flowchart/FlowchartDisplay'
import Input from './components/Input'
// import FlowChart from './flowchart/FlowChart'
import Home from './components/Home'
import LearningRoadMap from './flowchart/LearningRoadMap'
import Quiz from './flowchart/Quiz'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Input />,
  },
  {
    path: "/flowchartDisplay",
    element: <LearningRoadMap />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

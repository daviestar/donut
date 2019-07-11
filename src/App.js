import React, {useState} from 'react'
import DonutChart from './DonutChart'
import './App.css'

function generateValues(length = 5) {
  return Array.from({length}).map(() => Math.random() * 100)
}

export default function App() {
  const [values, setValues] = useState(generateValues())
  function handleClick() {
    setValues(generateValues())
  }
  return (
    <div className="app">
      <DonutChart values={values} />
      <button onClick={handleClick}>
        Generate
      </button>
    </div>
  )
}

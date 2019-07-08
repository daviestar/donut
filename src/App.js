import React, {useState, useEffect} from 'react'
// import DonutChart from './DonutChart'
import Pie from './DonutChart/_animated'
import './App.css'

function generateValues(length = 5) {
  return Array.from({length}).map(() => Math.random() * 100)
}

export default function App() {
  const [values, setValues] = useState(generateValues())
  const changeData = () => {
    setValues(generateValues())
  }
  useEffect(() => {
    setValues(generateValues())
  }, [])
  return (
    <div className="app">
      {/* <DonutChart values={values} /> */}
      <Pie values={values} />
      <button onClick={changeData}>Update</button>
    </div>
  )
}

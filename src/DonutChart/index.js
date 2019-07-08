import React from 'react'
import {pie, arc} from 'd3-shape'
import './index.css'

const colors = [
  '#73398C',
  '#3C74A6',
  '#018C7F',
  '#8AD9D1',
  '#D82928',
]

export default function DonutChart(props) {
  const {
    radius, thickness, padding,
    padAngle, cornerRadius, values,
  } = props

  const createPie = pie()
  const segments = createPie(values)

  const createArc = arc()
    .outerRadius(radius - padding)
    .innerRadius(radius - thickness + padding)
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

  const segmentPaths = segments
    .map((o) => createArc(o))
  const segmentCentroids = segments
    .map((o) => createArc.centroid(o))

  return (
    <svg className="donut" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <g transform={`translate(${radius}, ${radius})`}>
        <circle
          cx={0}
          cy={0}
          r={radius - (thickness / 2)}
          fill="none"
          strokeWidth={thickness}
          stroke="rgba(0, 0, 0, 0.1)"
        />
        {segmentPaths.map((path, idx) => (
          <path key={idx} fill={colors[idx]} d={path} />
        ))}
        {segmentCentroids.map(([x, y], idx) => (
          <circle key={idx} cx={x} cy={y} r={2} fill="white" />
        ))}
      </g>
    </svg>
  )
}

DonutChart.defaultProps = {
  radius: 50,
  thickness: 20,
  padAngle: 0.025,
  cornerRadius: 1.5,
  padding: 2.5,
  values: []
}

import React, {useState, useEffect, useMemo} from 'react'
import {pie, arc} from 'd3-shape'
import usePrevious from '../hooks/usePrevious'
import transition, {tween} from '../animate'
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

  const createPie = useMemo(
    () => pie().sort(null), []
  )

  const createArc = useMemo(
    () => arc()
      .outerRadius(radius - padding)
      .innerRadius(radius - thickness + padding)
      .padAngle(padAngle)
      .cornerRadius(cornerRadius),
    [radius, padding, thickness, padAngle, cornerRadius]
  )

  const segments = useMemo(
    () => createPie(values), [createPie, values]
  )

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
        {segments.map((segment, idx) => (
          <Arc
            key={idx}
            fill={colors[idx]}
            segment={segment}
            createArc={createArc}
          />
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

function Arc({fill, segment, createArc}) {
  const [startAngle, setStartAngle] = useState(null)
  const [endAngle, setEndAngle] = useState(null)
  const prevStartAngle = usePrevious(segment.startAngle)
  const prevEndAngle = usePrevious(segment.endAngle)

  useEffect(() => {
    // on mount
    if (
      prevStartAngle === undefined &&
      prevEndAngle === undefined
    ) {
      setStartAngle(segment.startAngle)
      setEndAngle(segment.endAngle)

    // transition on change
    } else if (
      prevStartAngle !== segment.startAngle ||
      prevEndAngle !== segment.endAngle
    ) {
      transition({
        duration: 400,
        update: (dt, fns) => {
          const t = fns.easeOutCubic(dt)
          setStartAngle(tween(t, prevStartAngle, segment.startAngle))
          setEndAngle(tween(t, prevEndAngle, segment.endAngle))
        }
      })
    }
  }, [
    prevStartAngle, segment.startAngle,
    prevEndAngle, segment.endAngle
  ])

  const path = useMemo(
    () => createArc({startAngle, endAngle}),
    [createArc, startAngle, endAngle]
  )
  const [x, y] = useMemo(
    () => createArc.centroid({startAngle, endAngle}),
    [createArc, startAngle, endAngle]
  )

  return (
    <g>
      <path fill={fill} d={path} />
      <circle cx={x} cy={y} r={1} fill="white" />
    </g>
  )
}

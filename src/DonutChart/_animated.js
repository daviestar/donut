import React, {useEffect} from 'react'
import {pie, arc} from 'd3-shape'
// import {animated, useSpring} from 'react-spring'
// import {interpolate} from 'd3-interpolate'
// import useAnimation from '../hooks/useAnimation'
import usePrevious from '../hooks/usePrevious'
import './index.css'

const colors = [
  '#73398C',
  '#3C74A6',
  '#018C7F',
  '#8AD9D1',
  '#D82928',
]

export default function Pie(props) {
  const createPie = pie().sort(null)
  const createArc = arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)
  const values = createPie(props.values)
  const prevValues = usePrevious(values) || []
  return (
    <svg className="donut">
      <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
        {values.map((value, idx) => (
          <Arc
            key={idx}
            idx={idx}
            from={prevValues[idx]}
            to={value}
            createArc={createArc}
          />
        ))}
      </g>
    </svg>
  )
}

// function tween(t, from, to) {
//   return from + (t * (to - from))
// }

function Arc(props) {
  const {idx, to, createArc} = props

  useEffect(() => {
    if (idx === 0) {
      console.log('hey!', to.startAngle, to.endAngle)
    }
  }, [to.startAngle, to.endAngle])

  // const t = useAnimation(to.startAngle + to.endAngle)
  // const startAngle = tween(t, from.startAngle, to.startAngle)
  // const endAngle = tween(t, from.endAngle, to.endAngle)
  // const label = tween(t, from.value, to.value)
  const startAngle = to.startAngle
  const endAngle = to.endAngle
  const label = to.value

  // if (idx === 0) {
  //   console.log(t, {from, to})
  // }

  return (
    <g className='arc'>
      <path
        className='arc'
        d={createArc({startAngle, endAngle})}
        fill={colors[idx]}
      />
      <text
        transform={`translate(${createArc.centroid({startAngle, endAngle})})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize="10">
        {parseInt(label, 10)}
      </text>
    </g>
  )
}

Arc.defaultProps = {
  from: {
    data: 0,
    endAngle: 0,
    index: 0,
    padAngle: 0,
    startAngle: 0,
    value: 0,
  },
}

Pie.defaultProps = {
  width: 200,
  height: 200,
  innerRadius: 60,
  outerRadius: 100,
  values: [],
}

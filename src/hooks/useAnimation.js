import {useState, useEffect} from 'react'

export default function useAnimation(changedProp1, changedProp2, props = {}) {
  // console.log(changedProp)

  const {easing = 'linear', duration = 500, delay = 0} = props
  const elapsed = useAnimationTimer(changedProp1, changedProp2, {duration, delay})
  const n = Math.min(1, elapsed / duration)
  return timingFunctions[easing](n)
}

function useAnimationTimer(changedProp1, changedProp2, {duration, delay}) {
  const [elapsed, setTime] = useState(0)
  // console.log('hey!')

  useEffect(() => {
    setTime(0)
    // console.log(changedProp, {duration, delay})
    let animationFrame, timerStop, start

    function onFrame() {
      setTime(Date.now() - start)
      loop()
    }

    function loop() {
      animationFrame = requestAnimationFrame(onFrame)
    }

    function onStart() {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(animationFrame)
        setTime(Date.now() - start)
      }, duration)
      start = Date.now()
      loop()
    }

    const timerDelay = setTimeout(onStart, delay)

    return () => {
      clearTimeout(timerStop)
      clearTimeout(timerDelay)
      cancelAnimationFrame(animationFrame)
    }
  }, [changedProp1, changedProp2])

  return elapsed
}

const timingFunctions = {
  linear:           t => t,
  easeInQuad:       t => t * t,
  easeInCubic:      t => t * t * t,
  easeInQuart:      t => t * t * t * t,
  easeInQuint:      t => t * t * t * t * t,
  easeOutQuad:      t => t * (2 - t),
  easeOutCubic:     t => (--t) * t * t + 1,
  easeOutQuart:     t => 1 - (--t) * t * t * t,
  easeOutQuint:     t => 1 + (--t) * t * t * t * t,
  easeInOutQuad:    t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInOutCubic:   t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOutQuart:   t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInOutQuint:   t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  easeInElastic:    t => (.04 - .04 / t) * Math.sin(25 * t) + 1,
  easeOutElastic:   t => .04 * t / (--t) * Math.sin(25 * t),
  easeInOutElastic: t => (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1,
  easeInSin:        t => 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2),
  easeOutSin:       t => Math.sin(Math.PI / 2 * t),
  easeInOutSin:     t => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2,
}

const defaultOpts = {
  delay:    0,
  duration: 1000,
  before:   () => {},
  update:   () => {},
  after:    () => {},
}

export default (options = {}) => {
  const opts = {...defaultOpts, ...options}
  let raf
  let tweenStart

  const animate = () => {
    const delta = Math.max(0, Math.min(1, (Date.now() - tweenStart) / opts.duration))
    if (delta < 1) {
      raf = window.requestAnimationFrame(animate)
    }
    opts.update(delta, timingFunctions)
    if (delta === 1) {
      opts.after()
    }
  }

  const start = setTimeout(() => {
    opts.before()
    tweenStart = Date.now()
    raf = window.requestAnimationFrame(animate)
  }, opts.delay)

  return {
    cancel() {
      window.clearTimeout(start)
      window.cancelAnimationFrame(raf)
    },
  }
}

export function tween(t, from, to) {
  return from + (t * (to - from))
}

/* eslint-disable max-len,no-param-reassign */
const timingFunctions = {
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
  // easeInOutElastic: t => (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1,

  easeInSin:        t => 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2),
  easeOutSin:       t => Math.sin(Math.PI / 2 * t),
  easeInOutSin:     t => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2,
}
/* eslint-enable */

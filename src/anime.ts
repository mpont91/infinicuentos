import anime from 'animejs'

export const fadeOutSlow = (targets: string[]) => {
  fadeOut(targets, 1000)
}

export const fadeOutFast = (targets: string[]) => {
  fadeOut(targets, 200)
}

const fadeOut = (targets: string[], duration: number = 1000) => {
  anime({
    targets: targets,
    opacity: [1, 0],
    duration: duration,
    easing: 'easeInQuad',
  })
}

export const slideUpIn = (targets: string[], delay: number) => {
  anime({
    targets: targets,
    opacity: [0, 1],
    translateY: [50, 0],
    delay: delay,
    duration: 1000,
    easing: 'easeOutExpo',
  })
}

export const showStoryFragment = (targets: string[]) => {
  anime({
    targets: targets,
    opacity: [0, 1],
    duration: 2500,
    easing: 'easeOutExpo',
  })
}

export const fall = (targets: string[]) => {
  anime({
    targets: targets,
    opacity: [1, 0],
    translateY: 1000,
    duration: 2500,
    easing: 'easeOutExpo',
  })
}

export const slide = (targets: string[], distance: number) => {
  if (distance === 0) {
    anime({
      targets: targets,
      translateX: 100,
      duration: 200,
      delay: 300,
      easing: 'easeInOutCirc',
      direction: 'alternate',
      loop: 2,
    })
  } else {
    anime({
      targets: targets,
      translateX: distance,
      duration: 700,
      delay: 300,
      easing: 'easeOutBounce',
    })
  }
}

import _ from 'lodash'

export function horizontalCenter(gameobject) {
  let width = gameobject.scene.sys.game.config.width
  gameobject.x = (width - gameobject.width) / 2
}

function parseHex(hexStr) {
  return Number.parseInt(`0x${hexStr}`)
}

export function lerpColor(colorA, colorB, ratio) {
  let color = ''
  colorA = colorA.toString(16)
  colorB = colorB.toString(16)

  _.range(0, 3).forEach(i => {
    let partialA = parseHex(colorA.slice(i * 2, (i + 1) * 2))
    let partialB = parseHex(colorB.slice(i * 2, (i + 1) * 2))
    let partial = Math.round(partialA + ratio * (partialB - partialA))

    color += _.padStart(partial.toString(16), 2, '0')
  })

  return parseHex(color)
}

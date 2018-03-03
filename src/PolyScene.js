import Phaser from 'phaser'
import { horizontalCenter, lerpColor } from './utils'

const FONT = 'sans-serif'

export default class LogoScene extends Phaser.Scene {
  asyncTween(config) {
    return new Promise(resolve => {
      this.tweens.add({
        ...config,
        onComplete: resolve
      })
    })
  }

  asyncTweenColor(config) {
    let targets = config.targets
    let colorA = targets.color
    let colorB = config.color
    delete config.targets
    delete config.color

    return this.asyncTween({
      ...config,
      targets: { ratio: 0 },
      ratio: 1,

      onUpdate(tween, { ratio }) {
        targets.color = lerpColor(colorA, colorB, ratio)
      }
    })
  }

  centerText(content, y, size = 16) {
    let text = this.add.text(0, 0, 0)

    text.setText(content)
    text.setFontSize(size)
    text.setFontFamily(FONT)
    text.setColor('#4e4e4e')
    text.y = y
    horizontalCenter(text)

    return text
  }
}

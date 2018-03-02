import Phaser from 'phaser'
import { horizontalCenter } from './utils'

export default class LogoScene extends Phaser.Scene {
  asyncTween(config) {
    return new Promise(resolve => {
      this.tweens.add({
        ...config,
        onComplete: resolve
      })
    })
  }

  centerText(content, y, size = 16) {
    let text = this.add.text(0, 0, 0)

    text.setText(content)
    text.setFontSize(size)
    text.y = y
    horizontalCenter(text)

    return text
  }
}

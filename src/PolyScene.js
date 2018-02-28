import Phaser from 'phaser'

export default class LogoScene extends Phaser.Scene {
  asyncTween(config) {
    return new Promise(resolve => {
      this.tweens.add({
        ...config,
        onComplete: resolve
      })
    })
  }
}

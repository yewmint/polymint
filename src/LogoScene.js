import Phaser from 'phaser'

export default class LogoScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LogoScene'
    })
  }

  preload() {}

  create() {
    this.logo = this.add.text(100, 100, 'This is logo :)')
    this.logo.alpha = 0
    this.tweens.add({
      targets: this.logo,
      alpha: 1,
      duration: 500
    })
  }
}

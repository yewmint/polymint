import PolyScene from './PolyScene'

export default class LogoScene extends PolyScene {
  constructor() {
    super({
      key: 'LogoScene'
    })
  }

  async create() {
    this.logo = this.add.text(0, 0, 'This is logo :)')

    this.logo.x = this.sys.game.config.width / 2 - this.logo.width / 2
    this.logo.y = this.sys.game.config.height / 2 - this.logo.height / 2
    this.logo.alpha = 0

    await this.asyncTween({
      targets: this.logo,
      alpha: 1,
      duration: 500,
      completeDelay: 1000
    })
    await this.asyncTween({
      targets: this.logo,
      alpha: 0,
      duration: 500
    })

    this.scene.start('GameScene')
  }
}

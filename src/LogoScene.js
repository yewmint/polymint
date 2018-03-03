import PolyScene from './PolyScene'
import { Rect } from './components'
import logoUrl from '../assets/logo.png'

export default class LogoScene extends PolyScene {
  constructor() {
    super({
      key: 'LogoScene'
    })
  }

  preload() {
    console.log(logoUrl)
    this.load.image('logo', logoUrl)
  }

  async create() {
    let width = this.sys.game.config.width
    let height = this.sys.game.config.height

    this.background = new Rect(this, {
      color: 0xffffff,
      width,
      height
    })

    this.logo = this.add.image('logo')
    this.logo.x = this.sys.game.config.width / 2 - this.logo.width / 2
    this.logo.y = this.sys.game.config.height / 2 - this.logo.height / 2
    this.logo.alpha = 1

    // await this.asyncTween({
    //   targets: this.logo,
    //   alpha: 1,
    //   duration: 500,
    //   completeDelay: 1000
    // })
    // await this.asyncTween({
    //   targets: this.logo,
    //   alpha: 0,
    //   duration: 500
    // })

    // this.scene.start('GameScene')
  }
}

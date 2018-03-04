import PolyScene from './PolyScene'
import { Rect } from './components'
import levelMusic1 from '../assets/n62.mp3'
import logoUrl from '../assets/logo.png'

export default class LogoScene extends PolyScene {
  constructor() {
    super({
      key: 'LogoScene'
    })
  }

  preload() {
    this.load.image('logo', logoUrl)
    this.load.audio('level-music-1', levelMusic1)
  }

  async create() {
    let width = this.sys.game.config.width
    let height = this.sys.game.config.height

    this.background = new Rect(this, {
      color: 0xffffff,
      width,
      height
    })

    this.logo = this.add.sprite(0, 0, 'logo')
    this.logo.x = this.sys.game.config.width / 2
    this.logo.y = this.sys.game.config.height / 2

    this.logoTitle = this.centerText('Yewmint', 470, 16)

    this.mask = new Rect(this, {
      color: 0xffffff,
      alpha: 1,
      width,
      height
    })

    await this.asyncTween({
      targets: this.mask,
      alpha: 0,
      duration: 500,
      completeDelay: 1000
    })

    await this.asyncTween({
      targets: this.mask,
      alpha: 1,
      duration: 500
    })

    this.scene.start('GameScene')
  }
}

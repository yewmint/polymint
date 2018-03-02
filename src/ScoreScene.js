import PolyScene from './PolyScene'
import {
  Rect
} from './components'
import {
  horizontalCenter
} from './utils'

const SCORE_NUM = 10

export default class ScoreScene extends PolyScene {
  constructor() {
    super({
      key: 'ScoreScene'
    })
  }

  create() {
    let width = this.sys.game.config.width
    let height = this.sys.game.config.height

    let score = this.registry.get('score') || Math.round(Math.random() * 10000)
    let storage = window.localStorage
    let scores = JSON.parse(storage.getItem('scores')) || []
    scores.push(score)
    scores.sort((a, b) => b - a)
    scores = scores.slice(0, SCORE_NUM)
    storage.setItem('scores', JSON.stringify(scores))

    this.background = new Rect(this, {
      color: 0x274854,
      width,
      height
    })

    this.score = this.centerText(`Your score: ${score}`, 160, 24)
    this.rankTitle = this.centerText('Rank Board', 240, 20)
    scores.forEach((ele, idx) => {
      let text = this.centerText(`${idx + 1}. ${ele}`, 280 + 30 * idx, 20)
      if (ele === score) {
        text.setColor(0xff0000)
      }
    })

    this.mask = new Rect(this, {
      color: 0,
      alpha: 1,
      width,
      height
    })

    this.enterAnim()
  }

  async enterAnim() {
    await this.asyncTween({
      targets: this.mask,
      alpha: 0,
      ease: 'Cubic.easeOut',
      duration: 500,
      completeDelay: 200
    })

    this.ready = true
  }

  async exitAnim() {
    this.ready = false

    await this.asyncTween({
      targets: this.mask,
      alpha: 1,
      ease: 'Cubic.easeOut',
      duration: 500,
      completeDelay: 200
    })

    this.scene.start('GameScene')
  }

  update() {
    if (!this.ready) {
      return
    }

    let pointer = this.input.manager.activePointer
    if (pointer.justDown) {
      this.exitAnim()
    }
  }
}
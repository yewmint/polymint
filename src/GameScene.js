import PolyScene from './PolyScene'
import levelMusic1 from '../assets/n62.mp3'
import { Circle, Rect, TargetLine } from './components'

const BALL_HEIGHT = 100
const BALL_RADIUS = 16
const BALL_FOLLOW_RATIO = 10
const SCORE_RATIO = 0.1

export default class GameScene extends PolyScene {
  constructor() {
    super({
      key: 'GameScene'
    })
  }

  preload() {
    this.load.audio('level-music-1', levelMusic1)
  }

  create() {
    let width = this.sys.game.config.width
    let height = this.sys.game.config.height

    this.background = new Rect(this, {
      color: 0x274854,
      alpha: 0,
      width,
      height
    })

    this.targetLine = new TargetLine(this)

    this.ball = new Circle(this, {
      x: width / 2,
      y: BALL_HEIGHT,
      z: 200,
      color: 0xfbf1d2,
      alpha: 0,
      radius: BALL_RADIUS / 2
    })

    this.score = 0
    this.scoreText = this.add.text(
      width - 100,
      20,
      _.padStart(this.score, 10, '0')
    )

    this.touchX = this.ball.x

    this.music = this.sound.add('level-music-1')
    this.music.volume = 0

    this.speed = 400

    this.enterAnim()

    // DEV
    this.keys = {
      S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      F: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
      J: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
      K: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
      L: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
    }

    window.noations = ''
  }

  async enterAnim() {
    await this.asyncTween({
      targets: this.background,
      alpha: 1,
      ease: 'Cubic.easeOut',
      duration: 500,
      completeDelay: 200
    })

    await this.asyncTween({
      targets: this.ball,
      alpha: 1,
      radius: BALL_RADIUS,
      ease: 'Cubic.easeOut',
      duration: 500,
      completeDelay: 500
    })

    this.gameReady = true

    this.music.play()
  }

  update(dur, dt) {
    if (!this.gameReady) return

    this.moveBallToFinger(dt)

    this.targetLine.paintLines(this.music.seek, this.speed)

    this.addScore()

    this.devGenNotation
  }

  moveBallToFinger(dt) {
    const pointer = this.input.manager.activePointer

    if (pointer.dirty) {
      this.touchX = pointer.x
    }

    // ball come close to touch point using lerp
    if (this.touchX != this.ball.x) {
      let ratio = _.clamp(BALL_FOLLOW_RATIO * dt / 1000, 0, 1)
      this.ball.x = _.clamp(
        Math.round(ratio * (this.touchX - this.ball.x) + this.ball.x),
        BALL_RADIUS,
        this.sys.game.config.width - BALL_RADIUS
      )
    }
  }

  addScore() {
    let width = this.sys.game.config.width
    let delta = _.clamp(
      Math.abs(this.ball.x - this.targetLine.linePosition()) / width,
      0,
      1
    )
    let curScore = _.clamp(Math.floor((1 - delta) ** 2 * 20 - 10), 0, 10)

    this.score += curScore

    this.scoreText.setText(_.padStart(Math.round(this.score), 10, '0'))
  }

  devGenNotation() {}
}

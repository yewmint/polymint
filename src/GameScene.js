import Phaser from 'phaser'
import PolyScene from './PolyScene'
import levelMusic1 from '../assets/n62.mp3'
import { Circle, Rect, TargetLine } from './components'

const BALL_HEIGHT = 100
const BALL_RADIUS = 16
const BALL_FOLLOW_RATIO = 20
const SCORE_RATIO = 100
const FONT =
  'Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","WenQuanYi Micro Hei",sans-serif'

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
    this.scoreText = this.add.text(0, 0, 0)
    this.scoreText.setFontSize(24)
    this._updateScore()

    this.mask = new Rect(this, {
      color: 0,
      alpha: 0,
      width,
      height
    })

    this.touchX = this.ball.x

    this.music = this.sound.add('level-music-1')
    this.lastSeek = 0

    this.speed = 400

    this.enterAnim()

    this.music.on('ended', () => {
      this.registry.set('score', Math.round(this.score))
      this.exitAnim()
    })

    // DEV
    // this.keys = [
    //   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    //   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    //   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
    //   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
    //   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
    //   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
    // ]

    // window.noations = ''
    // this.lastNotationPos = 0
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
    this.interactive = true

    this.music.play()
    // this.music.seek = 119
  }

  async exitAnim() {
    await this.asyncTween({
      targets: this.mask,
      alpha: 1,
      duration: 500,
      completeDelay: 500
    })

    this.scene.start('ScoreScene')
  }

  update(dur, dt) {
    if (!this.gameReady) return

    if (this.interactive) {
      this.moveBallToFinger(dt)
    }

    this.targetLine.paintLines(this.music.seek, this.speed)

    this.addScore()

    // this.devGenNotation()
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

  _updateScore() {
    let text = this.scoreText
    let width = this.sys.game.config.width
    let height = this.sys.game.config.height

    text.setText(Math.round(this.score))
    text.x = (width - text.width) / 2
    text.y = 20
  }

  addScore() {
    let seekDelta = this.music.seek - this.lastSeek
    this.lastSeek = this.music.seek

    let width = this.sys.game.config.width
    let delta = _.clamp(
      Math.abs(this.ball.x - this.targetLine.linePosition()) / width,
      0,
      1
    )
    let curScore =
      _.clamp(Math.floor((1 - delta) ** 2 * 20 - 10), 0, 10) *
      seekDelta *
      SCORE_RATIO

    this.score += curScore

    this._updateScore()
  }

  // devGenNotation() {
  //   let idx = _.findIndex(this.keys, key => Phaser.Input.Keyboard.JustDown(key))

  //   if (idx != -1) {
  //     let seek = this.music.seek
  //     let pos = idx + 1

  //     window.noations += `${seek - 0.1} ${this.lastNotationPos / 7}\n`
  //     window.noations += `${this.music.seek} ${pos / 7}\n`

  //     this.lastNotationPos = pos
  //   }
  // }
}

import Phaser from 'phaser'
import PolyScene from './PolyScene'
import levelMusic1 from '../assets/n62.mp3'
import { Circle, Rect, TargetLine } from './components'

const BALL_HEIGHT = 100
const BALL_RADIUS = 16
const BALL_FOLLOW_RATIO = 20
const SCORE_RATIO = 100
const FONT = 'sans-serif'

const COLOR_TABLE = [
  { time: 4, color: 0xd1f0f5 },
  { time: 17, color: 0xf5e5d1 },
  { time: 34, color: 0xd1f0f5 },
  { time: 51, color: 0xf5e5d1 },
  { time: 68, color: 0xdff5d1 },
  { time: 102, color: 0xd1c2dc },
  { time: 111, color: 0xffadad },
  { time: 120, color: 0xffffff }
]

export default class GameScene extends PolyScene {
  constructor() {
    super({
      key: 'GameScene'
    })
  }

  preload() {}

  create() {
    let width = this.sys.game.config.width
    let height = this.sys.game.config.height

    this.background = new Rect(this, {
      color: 0xffffff,
      alpha: 1,
      width,
      height
    })

    this.targetLine = new TargetLine(this)

    this.ball = new Circle(this, {
      x: width / 2,
      y: BALL_HEIGHT,
      z: 200,
      color: 0xea4c89,
      alpha: 0,
      radius: BALL_RADIUS / 2
    })

    this.score = 0
    this.scoreText = this.add.text(0, 0, 0)
    this.scoreText.setColor('#797979')
    this.scoreText.setFontSize(24)
    this.scoreText.setFontFamily(FONT)
    this._updateScore()

    this.mask = new Rect(this, {
      color: 0xffffff,
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
    // this.music.seek = 110
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

    this.controlColor()

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

  controlColor() {
    if (!_.has(this, 'colorIdx')) {
      this.colorIdx = 0
    }

    if (this.colorIdx >= COLOR_TABLE.length) {
      return
    }

    if (COLOR_TABLE[this.colorIdx].time < this.music.seek) {
      this.asyncTweenColor({
        targets: this.background,
        color: COLOR_TABLE[this.colorIdx].color,
        duration: 500,
        completeDelay: 500
      })

      ++this.colorIdx
    }
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

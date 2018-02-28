import Geometry from './Geometry'
import _ from 'lodash'
import lineSource from '../level1.obs'

const BALL_HEIGHT = 100
const LINE_WIDTH = 8
const LINE_COLOR = 0x98a49a

export default class TargetLine extends Geometry {
  constructor(scene, config = {}) {
    super(scene, config)

    this.points = _(lineSource)
      .split('\n')
      .compact()
      .map(line =>
        _(line)
          .split(/\s+/)
          .compact()
          .value()
      )
      .map(array => ({
        time: Number.parseFloat(array[0]),
        position: Number.parseFloat(array[1])
      }))
      .value()

    this._curTime = 0
    this._speed = 0
  }

  _calcX(point) {
    return this.scene.sys.game.config.width * point.position
  }

  _calcY(point) {
    return BALL_HEIGHT - (this._curTime - point.time) * this._speed
  }

  _gone(point) {
    let y = this._calcY(point)
    return y < 0
  }

  _coming(point) {
    let y = this._calcY(point)
    return y > this.scene.sys.game.config.height
  }

  _inScreen(point) {
    let y = this._calcY(point)
    return y >= 0 && y <= this.scene.sys.game.config.height
  }

  repaint() {
    super.repaint()
    this.lineStyle(LINE_WIDTH, LINE_COLOR)
  }

  paintLines(curTime, speed) {
    this.repaint()

    this._curTime = curTime
    this._speed = speed

    let points = this.points

    let firstIdx = _.findLastIndex(points, point => this._gone(point))
    firstIdx = firstIdx === -1 ? 0 : firstIdx

    let lastIdx = _.findIndex(points, point => this._coming(point))
    lastIdx = lastIdx === -1 ? points.length - 1 : lastIdx

    let realPoints = points
      .slice(firstIdx, lastIdx + 1)
      .map(point => ({ x: this._calcX(point), y: this._calcY(point) }))

    if (realPoints.length > 0) {
      this.strokePoints(realPoints)
    }
  }

  linePosition() {
    let points = this.points

    let aIdx = _.findLastIndex(
      points,
      point => this._calcY(point) <= BALL_HEIGHT
    )
    let bIdx = _.findIndex(points, point => this._calcY(point) >= BALL_HEIGHT)

    if (aIdx === -1 || bIdx === -1) {
      return -9999999
    }

    let a = { x: this._calcX(points[aIdx]), y: this._calcY(points[aIdx]) }
    let b = { x: this._calcX(points[bIdx]), y: this._calcY(points[bIdx]) }

    if (a.x === b.x) {
      return Math.round(a.x)
    }

    if (a.y === b.y) {
      return Math.round((a.x + b.x) / 2)
    }

    return Math.round(a.x + (BALL_HEIGHT - a.y) / (b.y - a.y) * (b.x - a.x))
  }
}

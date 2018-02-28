import Phaser from 'phaser'

export default class Geometry extends Phaser.GameObjects.Graphics {
  constructor(scene, config = {}) {
    super(scene, config)

    scene.add.existing(this)
    this._color = _.get(config, 'color', 0xffffff)
    this._alpha = _.get(config, 'alpha', 1)

    this.fillStyle(this._color, this._alpha)
  }

  get color() {
    return this._color
  }

  set color(val) {
    this._color = val
    this.repaint()
  }

  get alpha() {
    return this._alpha
  }

  set alpha(val) {
    this._alpha = val
    this.repaint()
  }

  repaint() {
    this.clear()
    this.fillStyle(this._color, this._alpha)
  }
}

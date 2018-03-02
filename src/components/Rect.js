import Geometry from './Geometry'
import _ from 'lodash'

export default class Rect extends Geometry {
  constructor(scene, config = {}) {
    super(scene, config)

    this._width = _.get(config, 'width', 10)
    this._height = _.get(config, 'height', 10)

    this.repaint()
  }

  get width() {
    return this._width
  }

  set radius(val) {
    this._width = val
    this.repaint()
  }

  get height() {
    return this._height
  }

  set height(val) {
    this._height = val
    this.repaint()
  }

  repaint() {
    super.repaint()
    this.fillRect(0, 0, this._width, this._height)
  }
}

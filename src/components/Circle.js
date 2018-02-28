import Geometry from './Geometry'
import _ from 'lodash'

export default class Circle extends Geometry {
  constructor(scene, config = {}) {
    super(scene, config)

    this._radius = _.get(config, 'radius', 10)
  }

  get radius() {
    return this._radius
  }

  set radius(val) {
    this._radius = val
    this.repaint()
  }

  repaint() {
    super.repaint()
    this.fillCircle(0, 0, this._radius)
  }
}

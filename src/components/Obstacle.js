import Geometry from './Geometry'
import _ from 'lodash'
import obstacleSource from '../level1.obs'
import { Number } from 'core-js/library/web/timers'

const ENABLE_INTERVAL = 5000
const BALL_HEIGHT = 100

export default class Obstacle extends Geometry {
  constructor(scene, config = {}) {
    super(scene, config)

    this.obstacles = _(obstacleSource)
      .split('\n')
      .compact()
      .map(line => {
        let data = _(line)
          .split(' ')
          .compact()
          .value()
        return {
          time: _.parseInt(data[0]),
          name: data[1],
          config: data.slice(2).map(str => _.parseInt(str))
        }
      })
      .value()
  }

  paintObstacles(curTime, speed) {
    super.repaint()

    let obstacles = _.filter(
      this.obstacles,
      obs => Math.abs(obs.time - curTime) < ENABLE_INTERVAL
    )

    for (let obstacle of obstacles) {
      this[`paint${obstacle.name}`](curTime, speed, obstacle)
    }
  }

  paintHorizontalBox(curTime, speed, { time, config }) {
    let width = this.scene.sys.game.config.width * 3

    let pos = config[0]
    let gap = config[1]
    let height = config[2]
    let moveSpeed = config[3]

    let dt = curTime - time
    let centerX = pos + moveSpeed * dt
    let centerY = BALL_HEIGHT - speed * dt

    this.fillRect(
      centerX - gap / 2 - width,
      centerY - height / 2,
      width,
      height
    )

    this.fillRect(centerX + gap / 2, centerY - height / 2, width, height)
  }
}

import 'babel-polyfill'
import Phaser from 'phaser'
import LogoScene from './LogoScene'

let config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 450,
  height: 800,
  scene: [LogoScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

window.game = new Phaser.Game(config)

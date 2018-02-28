import 'babel-polyfill'
import Phaser from 'phaser'
import LogoScene from './LogoScene'
import GameScene from './GameScene'

let config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 450,
  height: 800,
  scene: [
    // LogoScene,
    GameScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

window.game = new Phaser.Game(config)

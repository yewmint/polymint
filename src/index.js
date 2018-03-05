import 'babel-polyfill'
import Phaser from 'phaser'
import LogoScene from './LogoScene'
import GameScene from './GameScene'
import ScoreScene from './ScoreScene'

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
  StatusBar.hide()

  let config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: window.screen.width,
    height: window.screen.height,
    zoom: 0.99999999, // hack
    resolution: window.devicePixelRatio,
    scene: [LogoScene, GameScene, ScoreScene]
  }

  window.game = new Phaser.Game(config)
  console.log('ratio:')
  console.log(window.devicePixelRatio.toString())
}

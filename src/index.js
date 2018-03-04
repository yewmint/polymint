import 'babel-polyfill'
import Phaser from 'phaser'
import LogoScene from './LogoScene'
import GameScene from './GameScene'
import ScoreScene from './ScoreScene'

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
  window.plugins.screensize.get(successCallback, errorCallback)
}

function successCallback({ width, height }) {
  let config = {
    type: Phaser.AUTO,
    parent: 'app',
    width,
    height,
    scene: [LogoScene, GameScene, ScoreScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    }
  }

  window.game = new Phaser.Game(config)
}

function errorCallback(result) {
  console.log('can not get screen size.')
}

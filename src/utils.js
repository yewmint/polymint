export function horizontalCenter(gameobject) {
  let width = gameobject.scene.sys.game.config.width
  gameobject.x = (width - gameobject.width) / 2
}

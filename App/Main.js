import Core, { gl } from '../Core/Core.js'
import { Renderer2D } from '../Core/renderer/Renderer2D.js'
import { Ball } from './content/Ball.js'
import { Platform } from './content/Platform.js'
import { Player } from './content/Player.js'

export class Main extends Core.Scene {
  constructor() {
    super('Main Scene')

    const player1 = new Player()
    player1.tag = 'Player'
    player1.transform.position.x = 100
    player1.transform.position.y = 100
    this.AddChild(player1)

    const player2 = new Player('Player2')
    player2.tag = 'Player'
    player2.isPlayer2 = true
    player2.transform.position.x = gl.canvas.width - 200
    player2.transform.position.y = 100
    this.AddChild(player2)

    const ball = new Ball()
    ball.transform.position.x = gl.canvas.width / 2 - 25
    ball.transform.position.y = gl.canvas.height / 2 - 25
    this.AddChild(ball)
  }
}

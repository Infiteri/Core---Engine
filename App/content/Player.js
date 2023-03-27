import Core, { gl } from '../../Core/Core.js'
import { Body } from '../../Core/scene/extras/Body.js'
import { KinematicBody } from '../../Core/scene/extras/KinematicBody.js'
import { StaticBody } from '../../Core/scene/extras/StaticBody.js'

export class Player extends KinematicBody {
  isPlayer2 = false

  constructor(playerName = 'Player1') {
    super(playerName, 50, 200)

    const quad = new Core.QuadComponent('quad', this.width, this.height)
    this.AddComponent(quad)
    this.AddScript(new PS())
  }
}

class PS extends Core.KinematicScript {
  speed = 25

  OnUpdate() {
    if (this.parent.isPlayer2) {
      this.OnP2()
      return
    }

    if (Core.Input.IsKeyDown('KeyW')) {
      this.transform.position.y -= this.speed
    }

    if (Core.Input.IsKeyDown('KeyS')) {
      this.transform.position.y += this.speed
    }
  }

  OnP2() {
    if (Core.Input.IsKeyDown('ArrowUp')) {
      this.transform.position.y -= this.speed
    }

    if (Core.Input.IsKeyDown('ArrowDown')) {
      this.transform.position.y += this.speed
    }
  }
}

import Core, { gl } from '../../Core/Core.js'
import { KinematicBody } from '../../Core/scene/extras/KinematicBody.js'
import { KinematicScript } from '../../Core/script/KinematicScript.js'

export class Ball extends KinematicBody {
  constructor(width = 50, height = 50) {
    super('Ball', width, height)

    const quad = new Core.QuadComponent(name + 'Quad', width, height)
    this.AddComponent(quad)
    this.AddScript(new BS())
  }
}

class BS extends KinematicScript {
  speed = 10

  OnCollision(other) {
    if (other.parent.tag !== 'Player') return

    const { x  } = this.parent.transform.position

    if (other.GetPosition().x <= x + this.parent.width + 0.05) {
      this.parent.velocity.x = -this.parent.velocity.x
    }

    if (other.GetPosition().x + other.width + 0.05 >= x) {
      this.parent.velocity.x = -this.parent.velocity.x
    }
  }

  OnInit() {
    const { velocity } = this.parent

    velocity.x = this.speed
    velocity.y = this.speed
  }

  OnUpdate() {
    const { velocity, transform } = this.parent
    const { width, height } = gl.canvas

    if (transform.position.x + this.parent.width >= width) {
      velocity.x = -velocity.x
    }

    if (transform.position.x < 0) {
      velocity.x = -velocity.x
    }

    if (transform.position.y + this.parent.height >= height) {
      velocity.y = -velocity.y
    }

    if (transform.position.y < 0) {
      velocity.y = -velocity.y
    }
  }
}

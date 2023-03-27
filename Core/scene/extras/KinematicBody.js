import Core, { gl } from '../../Core.js'
import { Body } from './Body.js'
import { StaticBody } from './StaticBody.js'

export class KinematicBody extends Body {
  constructor(name = 'KinematicBody', width = 100, height = 100) {
    super(name, width, height)

    this.hitbox = new Core.RectCollisionComponent(
      name + 'Hitbox',
      width,
      height
    )
    this.AddComponent(this.hitbox)

    this.velocity = new Core.Vector3()
  }

  OnApplyGravity() {}

  OnBottomCanvasHit() {}

  DefaultCollision(other) {
    // //TODO: Fix collisions
    // const { position } = this.transform
    // const { velocity, width, height } = this
    // if (velocity.x > 0.5) {
    //   velocity.x = 0
    //   position.x = other.GetPosition().x - width - 1
    //   return
    // }
    // if (velocity.x < 0.5) {
    //   velocity.x = 0
    //   position.x = other.GetPosition().x + other.shape.width + 1
    //   return
    // }
    // if (velocity.y > 0) {
    //   velocity.y = 0
    //   position.y = other.GetPosition().y - height - 1
    //   return
    // }
    // if (velocity.y < 0) {
    //   velocity.y = 0
    //   position.y = other.GetPosition().y - height + 1
    //   return
    // }
  }

  OnCollision(other) {}

  Collision(other) {
    this.OnCollision(other)
    this.DefaultCollision(other)
  }

  Update() {
    super.Update()

    this.transform.position.x += this.velocity.x
    this.transform.position.y += this.velocity.y

    this.hitbox.OnCollision = other => {
      this.Collision(other)
    }

    //Gravity
    if (!this.WillBeOnFloor()) {
      this.OnApplyGravity()
    } else {
      this.OnBottomCanvasHit()
    }
  }

  WillBeOnFloor(floorsY = gl.canvas.height) {
    let result = false

    if (this.transform.position.y + this.height + this.velocity.y >= floorsY) {
      result = true
    }

    return result
  }
}

import Core from '../../Core/Core.js'
import { StaticBody } from '../../Core/scene/extras/StaticBody.js'

export class Platform extends StaticBody {
  constructor(name = 'platform', x, y, width, height) {
    super(name, width, height)

    this.transform.position.x = x
    this.transform.position.y = y

    const hitbox = new Core.RectCollisionComponent(
      'PlatformHitbox',
      width,
      height
    )
    this.AddComponent(hitbox)

    const quad = new Core.QuadComponent(name + 'Quad', width, height)
    quad.material.color = new Core.Color(255, 0, 0)
    this.AddComponent(quad)
  }
}

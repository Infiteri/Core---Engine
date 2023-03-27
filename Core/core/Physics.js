import { RectCollisionComponent } from '../scene/components/Components.js'

class CollisionData {
  /** @type {RectCollisionComponent} */
  a

  /** @type {RectCollisionComponent} */
  b

  constructor(a, b) {
    this.a = a
    this.b = b
  }
}

export class Physics {
  /** @type {Array.<RectCollisionComponent>} */
  static collisionComponents = []

  /** @type {Array.<CollisionData>} */
  static collisionData = []

  static AddCollisionComponent(instance) {
    this.collisionComponents.push(instance)
  }

  static Collisions() {
    for (let c = 0; c < this.collisionComponents.length; c++) {
      const comp = this.collisionComponents[c]

      for (let o = 0; o < this.collisionComponents.length; o++) {
        const other = this.collisionComponents[o]

        if (comp.shape.Intersects(other.shape)) {
          let exists = false
          for (let d = 0; d < this.collisionData.length; d++) {
            const data = this.collisionData[d]

            if (comp === other) continue

            if (
              (data.a === comp && data.b === other) ||
              (data.a === other && data.b === comp)
            ) {
              comp.OnCollision(other)
              other.OnCollision(comp)
              exists = true
              break
            }
          }

          if (!exists) {
            const col = new CollisionData(comp, other)
            this.collisionData.push(col)
          }
        }
      }
    }
  }

  static Work() {
    this.Collisions()
  }
}

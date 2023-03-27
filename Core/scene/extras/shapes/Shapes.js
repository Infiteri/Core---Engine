import Core from '../../../Core.js'

class Shape2D {
  constructor() {
    this.position = Core.Vector3.ZERO

    this.safeMargin = 1
  }

  Intersects(other) {}

  PointInShape() {}
}

export class Rectangle2D extends Shape2D {
  constructor(width, height) {
    super()

    this.width = width
    this.height = height
  }

  Intersects(other) {
    if (other instanceof Rectangle2D) {
      const pis1 = this.PointInShape(other.position)
      const pis2 = this.PointInShape(
        new Core.Vector3(other.position.x + other.width, other.position.y, 0)
      )
      const pis3 = this.PointInShape(
        new Core.Vector3(
          other.position.x + other.width,
          other.position.y + other.height,
          0
        )
      )

      const pis4 = this.PointInShape(
        new Core.Vector3(other.position.x, other.position.y + other.height, 0)
      )

      //pis = Point in shape
      if (pis1 || pis2 || pis3 || pis4) {
        return true
      }
    }

    return false
  }

  OnCollision(other) {}

  PointInShape(point) {
    if (
      point.x >= this.position.x &&
      point.x <= this.position.x + this.width &&
      point.y >= this.position.y &&
      point.y <= this.position.y + this.height
    ) {
      return true
    }

    return false
  }
}

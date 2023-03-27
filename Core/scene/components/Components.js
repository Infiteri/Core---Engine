import Core from '../../Core.js'
import { GameObject } from '../GameObject.js'

export class Component {
  constructor(name) {
    this.name = name

    /** @type {GameObject} */
    this.parent = undefined
  }

  Init() {}

  Render() {}

  Update() {}
}

export class QuadComponent extends Component {
  constructor(name, width, height) {
    super(name)

    this.quad = new Core.Quad(width, height)
    this.transform = this.quad.transform
    this.material = this.quad.material
  }

  Init() {
    this.quad.Init()
  }

  Render() {
    this.quad.Render(this.parent.worldMatrix)
  }

  Update() {
    this.quad.Update()
  }
}

export class SpriteComponent extends Component {
  constructor(name, width, height, src) {
    super(name)

    this.sprite = new Core.Sprite(width, height, src)
    this.transform = this.sprite.transform
  }

  Init() {
    this.sprite.Init()
  }

  Render() {
    this.sprite.Render(this.parent.worldMatrix)
  }

  Update() {
    this.sprite.Update()
  }
}

export class RectCollisionComponent extends Component {
  constructor(name, width, height) {
    super(name)

    this.shape = new Core.Rectangle2D(width, height)
  }

  Init() {
    Core.Physics.AddCollisionComponent(this)
  }

  GetPosition() {
    return this.shape.position
  }

  Update() {
    this.shape.position = this.parent.transform.position
  }

  OnCollision(other) {}
}

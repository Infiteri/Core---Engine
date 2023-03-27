import { KinematicBody } from '../scene/extras/KinematicBody.js'

export class KinematicScript {
  constructor() {
    /** @type {KinematicBody} */
    this.parent = undefined
  }

  Init() {
    this.transform = this.parent.transform
    this.OnInit()
  }

  Update() {
    this.parent.OnApplyGravity = this.OnApplyGravity.bind(this)
    this.parent.OnBottomCanvasHit = this.OnBottomCanvasHit.bind(this)
    this.parent.OnCollision = other => this.OnCollision(other)

    this.OnUpdate()
  }

  /**
   * What happens when the player hits the bottom of the canvas
   */
  OnBottomCanvasHit() {}

  /**
   * Re-write it with the gravity code
   *
   * @virtual
   */
  OnApplyGravity() {}

  OnCollision(other) {}

  OnInit() {}

  OnUpdate() {}
}

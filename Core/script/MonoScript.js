import { GameObject } from '../scene/GameObject.js'

export class MonoScript {
  constructor() {
    /** @type {GameObject} */
    this.parent = undefined
  }

  Init() {
    this.transform = this.parent.transform
    this.OnInit()
  }

  Update() {
    this.OnUpdate()
  }

  OnInit() {}

  OnUpdate() {}
}

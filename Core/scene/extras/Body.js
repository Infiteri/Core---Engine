import { GameObject } from '../GameObject.js'

export class Body extends GameObject {
  constructor(name, width, height) {
    super(name)

    this.width = width
    this.height = height
  }
}

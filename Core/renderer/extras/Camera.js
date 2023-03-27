import Core, { gl } from '../../Core.js'

export class OrthographicCamera {
  constructor() {
    //? Data for matrix to use
    this.left = 0
    this.right = gl.canvas.width
    this.bottom = gl.canvas.height
    this.top = 0
    this.far = 100
    this.near = -1

    this.projection = Core.Matrix4x4.OrthoGraphic(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.far,
      this.near
    )

    //? Data
    this.position = new Core.Vector3()
    this.model = Core.Matrix4x4.Translation(this.position)
  }

  GetMatrix() {
    return Core.Matrix4x4.Multiply(this.projection, this.model)
  }

  Recalculate() {
    this.right = gl.canvas.width
    this.bottom = gl.canvas.height

    this.projection = Core.Matrix4x4.OrthoGraphic(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.far,
      this.near
    )
  }
}

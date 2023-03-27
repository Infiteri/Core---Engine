import Core from '../../Core.js'
import { Object } from '../Object.js'

export class Quad extends Object {
  constructor(width = 100, height = 100) {
    super(`Quad`)

    this.material = new Core.Material()

    this.data = []
    this.vertices = [
      new Core.VertexXYZ(0, 0, 0),
      new Core.VertexXYZ(0, height, 0),
      new Core.VertexXYZ(width, height, 0),
      new Core.VertexXYZ(width, height, 0),
      new Core.VertexXYZ(width, 0, 0),
      new Core.VertexXYZ(0, 0, 0),
    ]

    this.Build() //? Build the data array

    this.transform = new Core.Transform()
    this.modelMatrix = this.transform.GetMatrix()

    this.buffer = Core.VertexBuffer.Create(this.data, 3)
    this.buffer.Layout(0, 0, 3)
  }

  /** @private */
  Build() {
    this.data = [] //? Empty

    for (const v of this.vertices) {
      this.data.push(...v.ToArray())
    }
  }

  /** @private */
  UploadMat4DataToShader(model) {
    const shader = Core.Renderer2D.shader
    if (shader !== null && model) {
      const m = Core.Matrix4x4.Multiply(this.modelMatrix, model)
      shader.Mat4(Core.BaseShader.objectMatrix, m.ToFloat32Array())
    }
  }

  Render(model) {
    this.UploadMat4DataToShader(model)

    this.material.Use()

    this.buffer.Bind()
    this.buffer.Draw()
  }
}

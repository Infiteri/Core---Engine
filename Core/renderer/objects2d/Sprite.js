import Core from '../../Core.js'
import { Object } from '../Object.js'

export class Sprite extends Object {
  constructor(width = 100, height = 100, textureName = '') {
    super(`Sprite`)

    this.data = []
    this.vertices = [
      new Core.VertexXYZ_UV(0, 0, 0, 0, 0),
      new Core.VertexXYZ_UV(0, height, 0, 0, 1),
      new Core.VertexXYZ_UV(width, height, 0, 1, 1),
      new Core.VertexXYZ_UV(width, height, 0, 1, 1),
      new Core.VertexXYZ_UV(width, 0, 0, 1, 0),
      new Core.VertexXYZ_UV(0, 0, 0, 0, 0),
    ]

    this.Build() //? Build the data array

    this.material = new Core.Material({
      textureName: textureName,
    })

    this.position = new Core.Vector3(0, 0, 0)
    this.modelMatrix = Core.Matrix4x4.Translation(this.position)

    this.buffer = Core.VertexBuffer.Create(this.data, 5)
    this.buffer.Layout(0, 0, 3)
    this.buffer.Layout(1, 3, 2)
  }

  /** @private */
  Build() {
    this.data = [] //? Empty

    for (const v of this.vertices) {
      this.data.push(...v.ToArray())
    }
  }

  GetMatrix() {
    this.modelMatrix = Core.Matrix4x4.Translation(this.position) //DONE: Recalculate model matrix
    return this.modelMatrix.ToFloat32Array()
  }

  /** @private */
  UploadMat4DataToShader() {
    const shader = Core.Renderer2D.shader
    if (shader !== null) {
      shader.Mat4(Core.BaseShader.objectMatrix, this.GetMatrix())
    }
  }

  Render() {
    this.UploadMat4DataToShader()

    this.material.Use()

    this.buffer.Bind()
    this.buffer.Draw()
  }
}

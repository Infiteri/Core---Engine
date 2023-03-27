import Core from '../../Core.js'

const config = {
  color: null,
  textureName: '',
}

export class Material {
  /**
   * @param {config} params The parameter of the material
   */
  constructor(params = {}) {
    this.shader = Core.Renderer2D.shader

    this.color = params.color || new Core.Color(255, 255, 255, 255)

    //?: Texture
    this.textureName = params.textureName || undefined
    this.useTexture = false
    if (this.textureName) {
      this.texture = Core.TextureManager.Get(this.textureName)
      this.useTexture = true
    }
  }

  Use() {
    if (this.shader !== null) {
      this.shader.Int(Core.BaseShader.useTexture, this.useTexture)

      if (this.useTexture) {
        if (this.texture === null) return

        Core.Renderer2D.shader.Int(Core.BaseShader.sampler, this.texture.unit)
      }

      this.shader.Vec4v(Core.BaseShader.color, this.color.To32Array())
    }
  }
}

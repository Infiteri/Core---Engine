import Core, { gl } from '../../Core.js'
import { Asset } from '../../manager/assets/AssetManager.js'
import { MessageHandler } from '../../messages/MessageBus.js'

export class Texture extends MessageHandler {
  static unit = -1

  constructor(name) {
    super()

    //* For sampling
    Texture.unit++
    this.unit = Texture.unit
    this.name = name

    this.width = 1
    this.height = 1

    //* Initial data
    this.texture = gl.createTexture()
    this.image = new Image()

    this.Bind()
    this.LoadTextureWithDefaultData()

    //* Load asset initially
    const asset = Core.AssetManager.GetAsset(name)
    if (asset) {
      this.LoadTextureWithAsset(asset)
    }

    Core.Message.Subscribe(Core.Message.assetLoaded + this.name, this)
  }

  OnMessage(message) {
    if (message.code === Core.Message.assetLoaded + this.name) {
      this.LoadTextureWithAsset(message.context)
    }
  }

  /**
   * @private
   *
   * @param {Asset} asset
   */
  LoadTextureWithAsset(asset) {
    const rgba = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE

    this.width = asset.width
    this.height = asset.height

    this.Bind()
    gl.texImage2D(gl.TEXTURE_2D, 0, rgba, rgba, srcType, asset.data)

    function vo2(value) {
      return (value & (value - 1)) === 0
    }

    const { width, height } = this

    if (vo2(width) && vo2(height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
      // No, it's not a power of 2. Turn off mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }

    //TODO: Dynamic filtering from user data
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  }

  /** @private */
  LoadTextureWithDefaultData() {
    const rgba = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE
    const pixel = new Uint8Array([255, 255, 255, 255])
    gl.texImage2D(gl.TEXTURE_2D, 0, rgba, 1, 1, 0, rgba, srcType, pixel)
  }

  Bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
  }

  Unbind() {
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  Activate() {
    this.Bind()
    gl.activeTexture(gl.TEXTURE0 + this.unit)
  }
}

import { Texture } from '../renderer/webgl/Texture.js'

export class TextureManager {
  /** @type {Object.<string, Texture>} */
  static textures = {}

  static Get(name) {
    return this.textures[name] || null
  }

  static Add(name, textureName) {
    const texture = new Texture(textureName || name)
    this.textures[name] = texture
  }
}

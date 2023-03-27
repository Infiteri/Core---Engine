import Core from '../../Core.js'

export class AssetLoader {
  /**
   * A list of supported extensions [.png, .gif, .json, etc... .]
   *
   * @type {Array.<string>}
   */
  supportedExtensions = []

  /**
   * Loads and asset
   *
   * @param {Asset} asset Asset to be loaded
   */
  LoadAsset(asset) {}
}

export class Asset {
  constructor() {
    /** @type {String} */
    this.name

    /** @type {any} */
    this.data
  }

  OnAssetLoaded() {}
}

//! Assets
class ImageAsset extends Asset {
  /**
   * @param {string} name
   * @param {HTMLImageElement} data
   */
  constructor(name, data) {
    super()

    this.name = name
    this.data = data
  }

  get width() {
    return this.data.width
  }

  get height() {
    return this.data.height
  }
}

class JSONAsset extends Asset {
  /**
   * @param {string} name
   * @param {object} data
   */
  constructor(name, data) {
    super()

    this.name = name
    this.data = data
  }
}

class GLAsset extends Asset {
  /**
   * @param {string} name
   * @param {object} data
   */
  constructor(name, data) {
    super()

    this.name = name
    this.data = data
  }
}

//!: Loaders
class ImageAssetLoader extends AssetLoader {
  supportedExtensions = ['png', 'gif', 'jif']

  /**
   * @param {string} asset
   */
  LoadAsset(name) {
    const image = new Image()
    image.onload = this.OnImageLoaded.bind(this, name, image)
    image.src = name
  }

  OnImageLoaded(name, image) {
    const asset = new ImageAsset(name, image)
    AssetManager.OnAssetLoaded(asset)
  }
}

class JSONAssetLoader extends AssetLoader {
  supportedExtensions = ['json']

  /**
   * @param {string} asset
   */
  LoadAsset(name) {
    const request = new XMLHttpRequest()
    request.open('GET', name)
    request.onload = this.OnJSONLoaded.bind(this, name, request)
    request.send()
  }

  /**
   * @param {string} name
   * @param {XMLHttpRequest} request
   */
  OnJSONLoaded(name, request) {
    if (request.readyState === request.DONE) {
      const json = JSON.parse(request.responseText)
      const asset = new JSONAsset(name, json)
      AssetManager.OnAssetLoaded(asset)
      asset.OnAssetLoaded()
    }
  }
}

class GLAssetLoader extends AssetLoader {
  supportedExtensions = ['glsl', 'hlsl', 'glshader']

  /**
   * @param {string} asset
   */
  LoadAsset(name) {
    const request = new XMLHttpRequest()
    request.open('GET', name)
    request.onload = this.OnGLLoaded.bind(this, name, request)
    request.send()
  }

  /**
   * @param {string} name
   * @param {XMLHttpRequest} request
   */
  OnGLLoaded(name, request) {
    if (request.readyState === request.DONE) {
      const asset = new GLAsset(name, request.response)
      AssetManager.OnAssetLoaded(asset)
    }
  }
}

export class AssetManager {
  /** @type {Array.<AssetLoader} */
  static loaders = []

  /** @type {Object.<string, Asset>} */
  static loadedAssets = {}

  static Init() {
    if (Core.infoLog)
      Core.ColorLog(`AssetManager.Init was successful`, 'lightgreen')

    this.loaders.push(new ImageAssetLoader())
    this.loaders.push(new JSONAssetLoader())
    this.loaders.push(new GLAssetLoader())
  }

  /**
   * Adds a new loader
   *
   * @param {AssetLoader} loader
   */
  static AddLoader(loader) {
    this.loaders.push(loader)
  }

  static OnAssetLoaded(asset) {
    AssetManager.loadedAssets[asset.name] = asset

    Core.Message.Send(Core.Message.assetLoaded + asset.name, this, asset)
  }

  /**
   * @param {string} name
   */
  static LoadAsset(name) {
    const extension = name.split('.').pop().toLowerCase()

    for (const l of this.loaders) {
      if (l.supportedExtensions.indexOf(extension) !== -1) {
        l.LoadAsset(name)
        return
      }
    }

    Core.Warn(`No loaders with extension: ${extension} (${name})`)
  }

  static IsAssetLoaded(name) {
    return this.loadedAssets[name] !== undefined
  }

  static GetAsset(name) {
    if (this.loadedAssets[name]) {
      return this.loadedAssets[name]
    } else {
      this.LoadAsset(name)
    }

    return undefined
  }
}

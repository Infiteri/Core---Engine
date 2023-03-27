import Core, { gl } from '../Core.js'

/**
 * namespace Core
 *
 * Main window instance used by the application / USER
 *
 * To get a new window use the method Window.Get(); So that its usable everywhere in the engine
 */
export class Window {
  /** @type {Window} */
  static instance = null

  /** @returns {Window} */
  static Get() {
    if (this.instance === null) {
      this.instance = new Window()
    }

    return this.instance
  }

  /** @private */
  _width = innerWidth

  /** @private */
  _height = innerHeight

  /** @private */
  _canvas = document.querySelector('canvas')

  Init() {
    if (Core.infoLog) {
      Core.ColorLog(`Window initialized successfully`, 'lightgreen')
    }

    this._SetData()
    this._Resizing()
  }

  /** @private */
  _SetData() {
    this._width = innerWidth
    this._height = innerHeight

    this._canvas.width = this._width
    this._canvas.height = this._height

    //DONE: GL Viewport
    gl.viewport(0, 0, this._width, this._height)

    //DONE: Recalculates camera matrix
    const camera = Core.Renderer2D.GetCamera()
    if (camera) camera.Recalculate()
  }

  /** @private */
  _Resizing() {
    window.onresize = () => {
      this._OnResizeCallback()
      this.OnResize()
    }
  }

  /** @private */
  _OnResizeCallback() {
    this._SetData()
  }

  /**
   * Allows for extra callback on resize by the USER
   *
   * (RESIZING THE CANVAS / VIEWPORT IS DONE AUTOMATICALLY)
   *
   * @virtual
   */
  OnResize() {}

  /**
   * @returns {number} The canvas width
   */
  GetWidth() {
    return this._width
  }

  /**
   * @returns {number} The canvas height
   */
  GetHeight() {
    return this._height
  }

  /**
   * @returns {number} The width / height aspect ratio
   */
  GetAspectRatio() {
    return this.GetWidth() / this.GetHeight()
  }
}

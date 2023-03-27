import Core, { gl } from '../Core.js'
import { OrthographicCamera } from './extras/Camera.js'
import { Shader } from './webgl/Shader.js'

/**
 * namespace Core
 *
 * Renderer used for all 2D Graphics
 *
 * TODO: Make it so that the application uses the Renderer2D More
 */
export class Renderer2D {
  /** @type {Shader} */
  static shader = null

  /**
   * Starts
   */
  static Begin() {
    this.shader = new Core.BaseShader()
    this.camera = new Core.OrthographicCamera()
  }

  /** @type {OrthographicCamera} */
  static camera = null

  static Render() {
    if (this.shader === null || this.shader.program === null) return

    this.Clear()

    this.shader.Use()

    this.shader.Mat4(
      Core.BaseShader.cameraMatrix,
      Renderer2D.GetCamera().GetMatrix().ToFloat32Array()
    )

    // Render the currently active scene
    if (Core.SceneManager.activeScene !== null) {
      const { r, g, b, a } =
        Core.SceneManager.activeScene.environment.backgroundColor

      this.ClearColor(r / 255, g / 255, b / 255, a)
    }

    Core.SceneManager.Render()
  }

  static GetCamera() {
    return this.camera
  }

  static Clear() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }

  /**
   * Sets the WebGL's background color to the passed in arguments (from a range 0 to 1)
   *
   * @param {number} r - The red channel (default to 0)
   * @param {number} g - The green channel (default to 0)
   * @param {number} b - The blue channel (default to 0)
   * @param {number} a - The alpha channel (default to 1)
   *
   * @defaults To black
   */
  static ClearColor(r = 0, g = 0, b = 0, a = 1) {
    gl.clearColor(r, g, b, a)
  }
}

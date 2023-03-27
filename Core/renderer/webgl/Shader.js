import Core, { gl } from '../../Core.js'
import { MessageHandler } from '../../messages/MessageBus.js'

export class Shader extends MessageHandler {
  constructor(vertexSource, fragmentSource) {
    super()

    this.vertexPath = vertexSource
    this.fragmentPath = fragmentSource

    this.vertexSource = ''
    this.fragmentSource = ''

    Core.AssetManager.GetAsset(vertexSource)
    Core.AssetManager.GetAsset(fragmentSource)

    Core.Message.Subscribe(Core.Message.assetLoaded + vertexSource, this)
    Core.Message.Subscribe(Core.Message.assetLoaded + fragmentSource, this)
  }

  OnMessage(message) {
    if (message.Is(Core.Message.assetLoaded + this.vertexPath)) {
      this.vertexSource = Core.AssetManager.GetAsset(this.vertexPath).data
    }

    if (message.Is(Core.Message.assetLoaded + this.fragmentPath)) {
      this.fragmentSource = Core.AssetManager.GetAsset(this.fragmentPath).data
    }

    setTimeout(() => {
      this.program = this._LoadProgram()
    }, 100)
  }

  GetUni(name, crashIfNull = true) {
    if (!this.program) return

    const location = gl.getUniformLocation(this.program, name)

    if (location === null && crashIfNull) {
      Core.Crash(`Uniform ${name} is null`)
      return null
    }

    return location
  }

  Int(name, int) {
    gl.uniform1i(this.GetUni(name), int)
  }

  Vec4v(name, data) {
    gl.uniform4fv(this.GetUni(name), data)
  }

  Mat4(name, data) {
    this.Use()
    gl.uniformMatrix4fv(this.GetUni(name), false, data)
  }

  Use() {
    gl.useProgram(this.program)
  }

  /** @private */
  _LoadProgram() {
    function LoadShader(type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const shaderType =
          type === gl.VERTEX_SHADER ? 'VERTEX_SHADER' : 'FRAGMENT_SHADER'

        Core.Crash(
          `Shader creation error of type ${shaderType}: ${gl.getShaderInfoLog(
            shader
          )}`
        )

        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    //Get the shaders
    const vertexShader = LoadShader(gl.VERTEX_SHADER, this.vertexSource)
    const fragmentShader = LoadShader(gl.FRAGMENT_SHADER, this.fragmentSource)

    //Program creation
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    //ERROR Checking
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      Core.Crash(`Shader program: ${gl.getProgramInfoLog(shaderProgram)}`)
      return null
    }

    return shaderProgram
  }
}

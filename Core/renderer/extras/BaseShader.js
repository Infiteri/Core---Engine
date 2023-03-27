import { Shader } from '../webgl/Shader.js'

export class BaseShader extends Shader {
  static position = 'aPosition'
  static cameraMatrix = 'uCameraMatrix'
  static objectMatrix = 'uObjectMatrix'
  static color = 'uColor'
  static uvs = 'aUvs'
  static vUvs = 'vUvs'
  static sampler = 'sampler'
  static useTexture = 'useTexture'

  constructor() {
    const path = '/Core/renderer/extras/shaders'
    const ext = 'glsl'

    super(`${path}/vertex.${ext}`, `${path}/fragment.${ext}`)
  }
}

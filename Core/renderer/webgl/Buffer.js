import Core, { gl } from '../../Core.js'

class BufferLayout {
  constructor(location, offset, size) {
    this.location = location
    this.offset = offset
    this.size = size
  }
}

//A vertex / index buffer will just reassign the buffer type
class Buffer {
  constructor(data = [], size = 0) {
    //? USER Data
    this.data = data
    this.size = size

    this.buffer = gl.createBuffer()
    this.bufferType = gl.ARRAY_BUFFER
    this.usage = gl.STATIC_DRAW
    this.drawMode = gl.TRIANGLES
    this.type = gl.FLOAT
    this.typeSize = Float32Array.BYTES_PER_ELEMENT
    this.stride = this.size * this.typeSize

    /** @type {Array.<BufferLayout>} */
    this.layouts = []
  }

  Init() {
    this.Bind()
    this.Upload()
  }

  Layout(location, offset, size) {
    const layout = new BufferLayout(location, offset, size)

    this.layouts.push(layout)
  }

  Bind() {
    gl.bindBuffer(this.bufferType, this.buffer)

    for (const layout of this.layouts) {
      const { location, offset, size } = layout

      gl.vertexAttribPointer(
        location,
        size,
        this.type,
        false,
        this.stride,
        offset * this.typeSize
      )

      gl.enableVertexAttribArray(location)
    }
  }

  Unbind() {
    gl.bindBuffer(this.bufferType, null)
  }

  Upload() {
    const data = new Float32Array(this.data)

    gl.bufferData(this.bufferType, data, this.usage)
  }

  Draw() {
    if (!Core.Renderer2D.shader.program) return

    //DONE: Make it dynamically based on the buffer type
    if (this.bufferType === gl.ARRAY_BUFFER) {
      gl.drawArrays(this.drawMode, 0, this.data.length / this.size)
    } else {
      gl.drawElements(this.drawMode, this.data.length, gl.UNSIGNED_SHORT, 0)
    }
  }
}

//DONE: Vertex Buffer

/**
 * namespace Core
 *
 * Inherited by the main buffer class (not in the core namespace yet)
 */
export class VertexBuffer extends Buffer {
  constructor(data = [], size = 0) {
    super(data, size)

    this.bufferType = gl.ARRAY_BUFFER

    this.Init()
  }

  static Create(data = [], size = 0) {
    const b = new VertexBuffer(data, size)
    return b
  }
}

//DONE: Index Buffer

/**
 * namespace Core
 *
 * Inherited by the main buffer class (not in the core namespace yet)
 */
export class IndexBuffer extends Buffer {
  constructor(data = [], size = 0) {
    super(data, size)

    this.bufferType = gl.ELEMENT_ARRAY_BUFFER

    this.Init()
  }
}

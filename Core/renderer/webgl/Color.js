export class Color {
  /**
   * Defaults to white
   *
   * @range from 0 - 255 for R,G,B and 0 - 1 for A
   *
   * @param {number} r The r channel
   * @param {number} g The g channel
   * @param {number} b The b channel
   * @param {number} a The a channel
   */
  constructor(r = 255, g = 255, b = 255, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  /**
   * @returns {Float32Array} A Float32Array from the data (R / 255, G / 255, B / 255, A)
   */
  To32Array() {
    const { r, g, b, a } = this

    return new Float32Array([r / 255, g / 255, b / 255, a])
  }
}

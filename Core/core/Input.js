/**
 * namespace Core
 *
 * Used for Input managing
 *
 * @support Keyboard and Mouse
 */
export class Input {
  //DONE: Mouse
  static mouse = {
    posX: 0,
    posY: 0,
    clickX: 0,
    clickY: 0,
    isDown: false,
    isMoving: false,
  }

  static IsMouseMoving() {
    return this.mouse.isMoving
  }

  static IsMouseDown() {
    return this.mouse.isDown
  }

  static IsMouseDragging() {
    return this.IsMouseDown() && this.IsMouseMoving()
  }

  //DONE: Keyboard
  /** @type {Object.<string, boolean>} */
  static keys = {}

  static IsKeyDown(value) {
    const key = this.keys[value]

    if (key) return key
  }

  //DONE: Main functions
  static Init() {
    //DONE: Initialize all the event listeners
    addEventListener('keydown', event => {
      const { key, code, keyCode } = event
      this.keys[key] = true
      this.keys[code] = true
      this.keys[keyCode] = true
    })

    addEventListener('keyup', event => {
      const { key, code, keyCode } = event
      this.keys[key] = false
      this.keys[code] = false
      this.keys[keyCode] = false
    })

    addEventListener('mousedown', event => {
      this.mouse.isDown = true
    })

    addEventListener('mouseup', event => {
      this.mouse.isDown = false

      this.mouse.clickX = event.offsetX
      this.mouse.clickY = event.offsetY
    })

    addEventListener('mousemove', event => {
      this.mouse.isMoving = true

      this.mouse.posX = event.offsetX
      this.mouse.posY = event.offsetY
    })
  }
}

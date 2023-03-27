export class UI {
  constructor(elementType) {
    this.domElement = document.createElement(elementType)
  }

  AddStyle(style = '') {
    this.domElement.style.cssText += style + ';'
    return this
  }

  FontSansSerif() {
    this.AddStyle(`font-family: sans-serif`)
    return this
  }

  Remove() {
    this.domElement.remove()
  }

  Add() {
    document.body.appendChild(this.domElement)
  }

  Absolute() {
    this.AddStyle(`position: absolute`)
    return this
  }

  SetPosition(x, y) {
    this.AddStyle(`left: ${x}px`)
    this.AddStyle(`top: ${y}px`)
    return this
  }

  ColorWhite() {
    this.AddStyle(`color: white`)
    return this
  }
}

export class TextUI extends UI {
  constructor(value) {
    super('h1')

    this.domElement.innerText = value
  }

  SetSize(sizeInPx) {
    this.AddStyle(`font-size: ${sizeInPx}px`)
    return this
  }
}

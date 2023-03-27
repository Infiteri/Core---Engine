import Core, { gl } from '../../Core.js'
import { GameObject } from '../GameObject.js'
import { Body } from './Body.js'

export class StaticBody extends Body {
  constructor(name = 'StaticBody', width = 100, height = 100) {
    super(name)

    this.width = width
    this.height = height
  }
}

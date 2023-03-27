import Core from '../Core.js'
import { Object } from '../renderer/Object.js'
import { MonoScript } from '../script/MonoScript.js'

export class GameObject extends Object {
  static id = -1

  constructor(name = 'GameObject') {
    super(name)

    /** @type {GameObject} */
    this.parent = undefined

    this.tag = 'GameObjectTag'

    //?GLOBAL Data
    GameObject.id++
    this.id = GameObject.id

    //? Positioning
    this.transform = new Core.Transform()

    //? Matrices
    this.worldMatrix = Core.Matrix4x4.Identity()
    this.localMatrix = Core.Matrix4x4.Identity()

    //DONE: Children
    /** @type {Array.<GameObject>} */ this.children = []

    //DONE: Components
    this.components = []

    //DONE: Scripts
    /** @type {Array.<MonoScript>} */ this.scripts = []
  }

  GetAllOfAType(classType) {
    let bodies = []

    for (const c of this.children) {
      if (c instanceof classType) {
        bodies.push(c)
      }
    }

    return bodies
  }

  AddScript(instance) {
    instance.parent = this
    instance.Init()
    this.scripts.push(instance)
  }

  GetComponentByName(name) {
    for (const c of this.children) {
      const result = c.GetComponentByName(name)

      return result
    }

    for (const c of this.components) {
      if (c.name === name) return c

      return undefined
    }
  }

  GetChildByName(name) {
    if (name === this.name) return this

    for (const c of this.children) {
      const result = c.GetChildByName(name)
      if (result) return result
    }

    return undefined
  }

  AddComponent(component) {
    component.parent = this
    component.Init()
    this.components.push(component)
  }

  AddChild(child) {
    child.parent = this
    child.Init()
    this.children.push(child)
  }

  Init() {}

  Render() {
    for (const c of this.components) {
      c.Render()
    }

    for (const c of this.children) {
      c.Render()
    }
  }

  Update() {
    this.localMatrix = this.transform.GetMatrix()
    this.UpdateWorldMatrix()

    for (const c of this.components) {
      c.Update()
    }

    for (const c of this.children) {
      c.Update()
    }

    for (const s of this.scripts) {
      s.Update()
    }
  }

  UpdateWorldMatrix() {
    const matrix = this.parent ? this.parent.worldMatrix : undefined

    if (matrix) {
      this.worldMatrix = Core.Matrix4x4.Multiply(
        this.parent.worldMatrix,
        this.localMatrix
      )
    } else {
      this.worldMatrix.CopyFrom(this.localMatrix)
    }
  }
}

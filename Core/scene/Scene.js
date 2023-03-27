import Core from '../Core.js'

export class Scene {
  constructor(name = 'Scene') {
    this.name = name
    this.root = new Core.GameObject('__ROOT__')

    this.environment = new Core.Environment()

    Core.SceneManager.Add(this)
  }

  SetAsCurrentScene() {
    Core.SceneManager.SetActiveScene(this)
  }

  GetAllOfAType(classType) {
    let b = this.root.GetAllOfAType(classType)

    return b
  }

  OnBegin() {}

  OnEnd() {}

  GetChildByName(name) {
    return this.root.GetChildByName(name)
  }

  Init() {
    this.root.Init()
  }

  Render() {
    this.root.Render()
  }

  Update() {
    this.root.Update()
  }

  AddComponent(component) {
    this.root.AddComponent(component)
  }

  AddChild(child) {
    this.root.AddChild(child)
  }
}

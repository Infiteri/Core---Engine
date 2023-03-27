import Core from '../Core.js'
import { Scene } from '../scene/Scene.js'

export class SceneManager {
  /** @type {Array.<Scene>} */
  static scenes = []

  /** @type {Scene} */
  static activeScene = null

  static Add(scene) {
    this.scenes.push(scene)
  }

  static Get(name) {
    for (const s of this.scenes) {
      if (s.name === name) return s
    }

    return null
  }

  static ToScene(scene) {
    this.SetActiveScene(scene)
  }

  static SetActiveScene(scene) {
    if (scene !== null) {
      if (this.activeScene !== null) {
        this.activeScene.OnEnd()
      }

      this.activeScene = scene
      this.activeScene.OnBegin()
      this.activeScene.Init()
    }
  }

  static SetActiveSceneByName(name) {
    const scene = this.Get(name)

    if (scene !== null) {
      if (this.activeScene !== null) {
        this.activeScene.OnEnd()
      }

      this.activeScene = scene
      this.activeScene.OnBegin()
      this.activeScene.Init()
    }
  }

  static Render() {
    if (this.activeScene !== null) this.activeScene.Render()
  }

  static Update() {
    if (this.activeScene !== null) this.activeScene.Update()
  }
}

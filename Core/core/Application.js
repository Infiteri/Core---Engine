import Core from '../Core.js'
import { MessageHandler } from '../messages/MessageBus.js'

/**
 * namespace Core
 *
 * Blueprint for all applications
 *
 * Implemented by the USER, the main class for the app gets extended by this class
 *
 * ONLY RE-WRITE THE INIT FUNCTION (ALSO USE super.Init())
 */
export class Application extends MessageHandler {
  constructor() {
    super()

    this.isApplication = true

    this.state = new Core.State(`NOPE`)
    this.window = Core.Window.Get()

    Core.MessageBus.AddGlobalHandler(this)
  }

  OnMessage(message) {}

  Init() {
    this.window.Init()
    this.state.To(`YES`)
  }

  Update() {
    Core.Update()
    Core.SceneManager.Update()
  }

  Render() {
    Core.Renderer2D.Render()
  }

  Loop() {
    if (!this.state.is(`YES`)) return

    this.Render()
    this.Update() //$: Update after the render so that the app is in the right state when loaded

    requestAnimationFrame(this.Loop.bind(this))
  }

  Run() {
    //DONE: Call init and begin main loop
    this.Init()
    this.Loop()
  }
}

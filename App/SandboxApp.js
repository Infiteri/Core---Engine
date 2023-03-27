import Core from '../Core/Core.js'
import { Renderer2D } from '../Core/renderer/Renderer2D.js'
import { Main } from './Main.js'

class SandboxApp extends Core.Application {
  Init() {
    super.Init()
    Renderer2D.Begin()

    // new Core.TextUI('Hello')
    //   .Absolute()
    //   .SetPosition(0, 0)
    //   .ColorWhite()
    //   .FontSansSerif()
    //   .SetSize(64)
    //   .Add()

    new Main().SetAsCurrentScene()
  }
}

Core.CreateApplication = () => {
  return new SandboxApp()
}
//? Init main core / application
Core.Start()

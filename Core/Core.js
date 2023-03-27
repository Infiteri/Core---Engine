//? imports
import { Application } from './core/Application.js'
import { Input } from './core/Input.js'
import { Physics } from './core/Physics.js'
import { State } from './core/State.js'
import { Window } from './core/Window.js'
import {
  Asset,
  AssetLoader,
  AssetManager,
} from './manager/assets/AssetManager.js'
import { SceneManager } from './manager/SceneManager.js'
import { TextureManager } from './manager/TextureManager.js'
import { Matrix4x4 } from './math/Matrix4x4.js'
import { Transform } from './math/Transform.js'
import { Vector3 } from './math/Vector3.js'
import { VertexXYZ, VertexXYZ_UV } from './math/Vertex.js'
import { Message, MessagePriority } from './messages/Message.js'
import { MessageBus, MessageHandler } from './messages/MessageBus.js'
import { BaseShader } from './renderer/extras/BaseShader.js'
import { OrthographicCamera } from './renderer/extras/Camera.js'
import { Material } from './renderer/extras/Material.js'
import { Object } from './renderer/Object.js'
import { Quad } from './renderer/objects2d/Quad.js'
import { Sprite } from './renderer/objects2d/Sprite.js'
import { Renderer2D } from './renderer/Renderer2D.js'
import { IndexBuffer, VertexBuffer } from './renderer/webgl/Buffer.js'
import { Color } from './renderer/webgl/Color.js'
import { Shader } from './renderer/webgl/Shader.js'
import { Texture } from './renderer/webgl/Texture.js'
import {
  QuadComponent,
  RectCollisionComponent,
  SpriteComponent,
} from './scene/components/Components.js'
import { Environment } from './scene/Environment.js'
import { KinematicBody } from './scene/extras/KinematicBody.js'
import { Rectangle2D } from './scene/extras/shapes/Shapes.js'
import { StaticBody } from './scene/extras/StaticBody.js'
import { GameObject } from './scene/GameObject.js'
import { Scene } from './scene/Scene.js'
import { KinematicScript } from './script/KinematicScript.js'
import { MonoScript } from './script/MonoScript.js'
import { TextUI } from './ui/UI.js'

export const gl = document.querySelector('canvas').getContext('webgl')

//? main class
/**
 * namespace Core
 *
 * Main class for:
 *  - storing classes
 *  - core debugging functions (Crash, Log, Warn, etc... .)
 *  - gl related
 *  - cameras
 *  - others
 */

export default class Core {
  //? exports
  //* Core
  static Application = Application
  static Input = Input
  static Window = Window
  static Physics = Physics
  static SceneManager = SceneManager
  static TextureManager = TextureManager
  static MonoScript = MonoScript
  static KinematicScript = KinematicScript
  static State = State

  //* UI
  static TextUI = TextUI

  //* Message
  static Message = Message
  static MessagePriority = MessagePriority
  static MessageHandler = MessageHandler
  static MessageBus = MessageBus

  //* Assets
  static Asset = Asset
  static AssetLoader = AssetLoader
  static AssetManager = AssetManager

  //* WebGL
  static Color = Color
  static Texture = Texture
  static Material = Material
  static Shader = Shader
  static BaseShader = BaseShader
  static VertexBuffer = VertexBuffer
  static IndexBuffer = IndexBuffer

  //* Extras for scenes
  static Rectangle2D = Rectangle2D

  //* Scene
  static GameObject = GameObject
  static StaticBody = StaticBody
  static KinematicBody = KinematicBody
  static QuadComponent = QuadComponent
  static RectCollisionComponent = RectCollisionComponent
  static SpriteComponent = SpriteComponent
  static Scene = Scene
  static Environment = Environment

  //* Renderer
  static Renderer2D = Renderer2D

  //* Objects
  static Object = Object
  static Quad = Quad
  static Sprite = Sprite

  //* Camera
  static OrthographicCamera = OrthographicCamera

  //* Math
  static Matrix4x4 = Matrix4x4
  static Vector3 = Vector3
  static Transform = Transform
  static VertexXYZ = VertexXYZ
  static VertexXYZ_UV = VertexXYZ_UV

  //? data
  static gl = gl // WebGL Context

  /**
   *  @private Main user application
   *
   *  @type {Application}
   */
  static application = null

  /**
   * @public Displays messages on the console
   */
  static infoLog = false

  /**
   * @virtual Function that returns application (implemented by the user)
   */
  static CreateApplication() {}

  /**
   * Gets called after the Core.CreateApplication function is reassigned
   */
  static Start() {
    this.Success(`Trying To Initialize Core`)

    //? Assign the app provided by the user
    this.application = this.CreateApplication()

    //!!!: Make sure app is defined
    if (this.application !== undefined && this.infoLog) {
      this.ColorLog(`Application Class Initialized Successfully`, 'lightgreen')
    }

    //? Doesn't exist so don't work cuz its pointless
    if (this.application === undefined || this.application === null) {
      this.Crash(`App can't be ${this.application}.`)
      return
    }

    //DONE: Init the core classes / managers
    Input.Init()
    AssetManager.Init()

    //$: Run the app
    this.application.Run()

    this.Success(`Core Initialized successfully`)
  }

  /**
   * Gets called in the update loop, updates managers
   */
  static Update() {
    MessageBus.Update()
    Physics.Work() //? XD ( :( )
  }

  //DONE: Implement all logging functions
  /**
   * @param {string} message The message to print in a green color
   */
  static Success(message) {
    console.log(`%c${message}`, 'color: #00ff00;')
  }

  /**
   * @param {string} message The message to log
   */
  static Log(message) {
    console.log(message)
  }
  /**
   * @param {string} message The message that the console outputs and stops execution
   */
  static Crash(message) {
    throw new Error(message)
  }

  /**
   * @param {string} message The message to error
   */
  static Error(message) {
    console.error(message)
  }

  /**
   * @param {string} message The message warn
   */
  static Warn(message) {
    console.warn(message)
  }

  /**
   * @param {string} message The message to print in a custom color
   * @param {string} color The color of the message
   */
  static ColorLog(message, color) {
    console.log(`%c${message}`, `color: ${color};`)
  }
}

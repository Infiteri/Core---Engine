import Core from '../Core.js'

export const MessagePriority = {
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
}

export class Message {
  /**
   * Message class
   *
   * @param {string} code The message code
   * @param {any} sender Who / What sends it
   * @param {any?} context Context for any data
   * @param {MessagePriority} priority HIGH | NORMAL
   */
  constructor(code, sender, context, priority = MessagePriority.NORMAL) {
    this.code = code
    this.sender = sender
    this.context = context
    this.priority = priority
  }

  Is(code) {
    return this.code === code
  }

  //? Messages used in the main cases
  static assetLoaded = 'Asset_Loaded_Message::'

  /**
   * Message sending
   *
   * @param {string} code The message code
   * @param {any} sender Who / What sends it
   * @param {any?} context Context for any data
   *
   * @priority - NORMAL
   */
  static Send(code, sender, context) {
    Core.MessageBus.Post(
      new Core.Message(code, sender, context, MessagePriority.NORMAL)
    )
  }

  /**
   * Message sending
   *
   * @param {string} code The message code
   * @param {any} sender Who / What sends it
   * @param {any?} context Context for any data
   *
   * @priority - HIGH
   */
  static SendHigh(code, sender, context) {
    Core.MessageBus.Post(
      new Core.Message(code, sender, context, MessagePriority.HIGH)
    )
  }

  static Subscribe(code, handler) {
    Core.MessageBus.AddSubscription(code, handler)
  }

  static Unsubscribe(code, handler) {
    Core.MessageBus.RemoveSubscription(code, handler)
  }
}

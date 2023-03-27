import Core from '../Core.js'
import { Message } from './Message.js'

export class MessageHandler {
  OnMessage(message) {}
}

export class MessageSubscriptionNode {
  /**
   *
   * @param {Message} message
   * @param {MessageHandler} handler
   */
  constructor(message, handler) {
    this.message = message
    this.handler = handler
  }
}

export class MessageBus {
  /** @type {Object.<string, Array.<MessageHandler>>} */
  static subscriptions = {}

  static normalMessageQueuePerUpdate = 1000

  /** @type {Array.<MessageSubscriptionNode>} */
  static normalMessageQueue = []

  static globalHandlers = []

  /**
   * @param {string} code
   * @param {MessageHandler} handler
   */
  static AddSubscription(code, handler) {
    if (!this.subscriptions[code]) {
      this.subscriptions[code] = []
    }

    if (this.subscriptions[code].indexOf(handler) !== -1) {
      Core.Warn(`Can't add duplicate handler CODE: ${code}`)
      return
    } else {
      this.subscriptions[code].push(handler)
    }
  }

  /**
   * @param {string} code
   * @param {MessageHandler} handler
   */
  static RemoveSubscription(code, handler) {
    if (!this.subscriptions[code]) {
      Core.Warn(`Can't remove sub. CODE: ${code}; Undefined / Not found`)
    }

    const index = this.subscriptions[code].indexOf(handler)
    if (index !== -1) {
      this.subscriptions[code].splice(index, 1)
    }
  }

  static AddGlobalHandler(handler) {
    this.globalHandlers.push(handler)
  }

  /**
   * @param {Message} message
   */
  static Post(message) {
    // if (Core.infoLog) {
    //   console.table(message)
    // }

    for (const h of this.globalHandlers) {
      h.OnMessage(message)
    }

    const handlers = this.subscriptions[message.code]

    //* No handlers?
    if (!handlers) return

    for (const h of handlers) {
      if (message.priority === Core.MessagePriority.HIGH) {
        h.OnMessage(message)
      } else {
        this.normalMessageQueue.push(new MessageSubscriptionNode(message, h))
      }
    }
  }

  static Update() {
    if (this.normalMessageQueue.length === 0) return //* No messages

    //* Determine how much should it loop (60 or the arrays length)
    const messageLength = Math.min(
      this.normalMessageQueuePerUpdate,
      this.normalMessageQueue.length
    )

    for (let i = 0; i < messageLength; i++) {
      const node = this.normalMessageQueue.pop()

      node.handler.OnMessage(node.message)
    }
  }
}

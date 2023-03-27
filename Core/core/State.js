export class State {
  constructor(defaultState = 'DEFAULT_STATE') {
    this.currentState = defaultState
  }

  To(newState) {
    this.currentState = newState
  }

  is(state) {
    return this.currentState === state
  }
}

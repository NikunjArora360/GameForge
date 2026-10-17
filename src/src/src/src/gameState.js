/**
 * GameForge Game State
 * A lightweight state manager for indie games.
 */

export class GameState {
  constructor(initialState = {}) {
    this.state = structuredClone(initialState);
  }

  set(key, value) {
    this.state[key] = value;
    return value;
  }

  get(key) {
    return this.state[key];
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.state, key);
  }

  remove(key) {
    delete this.state[key];
  }

  update(values = {}) {
    Object.assign(this.state, values);
    return this.getAll();
  }

  getAll() {
    return structuredClone(this.state);
  }

  reset(newState = {}) {
    this.state = structuredClone(newState);
  }

  toJSON() {
    return this.getAll();
  }
}

/**
 * GameForge Inventory
 * A lightweight inventory system for indie games.
 */

export class Inventory {
  constructor(maxSlots = Infinity) {
    this.maxSlots = maxSlots;
    this.items = new Map();
  }

  add(itemId, quantity = 1) {
    if (!itemId || quantity <= 0) {
      throw new Error("itemId and a positive quantity are required.");
    }

    const current = this.items.get(itemId) || 0;
    this.items.set(itemId, current + quantity);

    return this.get(itemId);
  }

  remove(itemId, quantity = 1) {
    const current = this.items.get(itemId) || 0;

    if (quantity <= 0) {
      throw new Error("Quantity must be positive.");
    }

    if (current < quantity) {
      return false;
    }

    const remaining = current - quantity;

    if (remaining === 0) {
      this.items.delete(itemId);
    } else {
      this.items.set(itemId, remaining);
    }

    return true;
  }

  has(itemId, quantity = 1) {
    return (this.items.get(itemId) || 0) >= quantity;
  }

  get(itemId) {
    return this.items.get(itemId) || 0;
  }

  clear() {
    this.items.clear();
  }

  toJSON() {
    return Object.fromEntries(this.items);
  }
}

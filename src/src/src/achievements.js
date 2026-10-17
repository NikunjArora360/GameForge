/**
 * GameForge Achievement System
 * A simple achievement tracker for indie games.
 */

export class AchievementManager {
  constructor() {
    this.achievements = new Map();
  }

  register(id, title, description = "") {
    if (!id || !title) {
      throw new Error("Achievement id and title are required.");
    }

    this.achievements.set(id, {
      id,
      title,
      description,
      unlocked: false,
      unlockedAt: null
    });

    return this.get(id);
  }

  unlock(id) {
    const achievement = this.achievements.get(id);

    if (!achievement) {
      return false;
    }

    if (!achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
    }

    return this.get(id);
  }

  isUnlocked(id) {
    return this.achievements.get(id)?.unlocked === true;
  }

  get(id) {
    const achievement = this.achievements.get(id);
    return achievement ? { ...achievement } : null;
  }

  getAll() {
    return [...this.achievements.values()].map((achievement) => ({
      ...achievement
    }));
  }

  getUnlocked() {
    return this.getAll().filter((achievement) => achievement.unlocked);
  }
}

/**
 * GameForge Quest System
 * A lightweight quest tracker for indie games.
 */

export class QuestManager {
  constructor() {
    this.quests = new Map();
  }

  addQuest(id, title, description = "") {
    if (!id || !title) {
      throw new Error("Quest id and title are required.");
    }

    this.quests.set(id, {
      id,
      title,
      description,
      status: "available",
      progress: 0,
      objectives: []
    });

    return this.getQuest(id);
  }

  addObjective(questId, objective, required = 1) {
    const quest = this.quests.get(questId);

    if (!quest) {
      throw new Error(`Quest "${questId}" does not exist.`);
    }

    quest.objectives.push({
      description: objective,
      required,
      progress: 0,
      completed: false
    });

    return this.getQuest(questId);
  }

  startQuest(questId) {
    const quest = this.quests.get(questId);

    if (!quest) {
      return false;
    }

    quest.status = "active";
    return true;
  }

  updateObjective(questId, objectiveIndex, amount = 1) {
    const quest = this.quests.get(questId);

    if (!quest || !quest.objectives[objectiveIndex]) {
      return false;
    }

    const objective = quest.objectives[objectiveIndex];

    objective.progress = Math.min(
      objective.progress + amount,
      objective.required
    );

    objective.completed = objective.progress >= objective.required;

    if (quest.objectives.length > 0 &&
        quest.objectives.every((item) => item.completed)) {
      quest.status = "completed";
    }

    return this.getQuest(questId);
  }

  getQuest(questId) {
    const quest = this.quests.get(questId);
    return quest ? structuredClone(quest) : null;
  }

  getActiveQuests() {
    return [...this.quests.values()]
      .filter((quest) => quest.status === "active")
      .map((quest) => structuredClone(quest));
  }
}

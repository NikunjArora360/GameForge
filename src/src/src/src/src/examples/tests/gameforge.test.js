import test from "node:test";
import assert from "node:assert/strict";

import {
  Inventory,
  QuestManager,
  AchievementManager,
  GameState
} from "../src/index.js";

test("Inventory adds and removes items", () => {
  const inventory = new Inventory();

  inventory.add("potion", 3);

  assert.equal(inventory.get("potion"), 3);
  assert.equal(inventory.has("potion", 2), true);

  inventory.remove("potion", 1);

  assert.equal(inventory.get("potion"), 2);
});

test("QuestManager completes objectives", () => {
  const quests = new QuestManager();

  quests.addQuest("quest-1", "Test Quest");
  quests.addObjective("quest-1", "Collect items", 2);
  quests.startQuest("quest-1");

  quests.updateObjective("quest-1", 0, 2);

  assert.equal(quests.getQuest("quest-1").status, "completed");
});

test("AchievementManager unlocks achievements", () => {
  const achievements = new AchievementManager();

  achievements.register(
    "achievement-1",
    "First Achievement"
  );

  achievements.unlock("achievement-1");

  assert.equal(
    achievements.isUnlocked("achievement-1"),
    true
  );
});

test("GameState stores and updates values", () => {
  const state = new GameState({
    level: 1
  });

  state.set("score", 100);
  state.update({
    level: 2
  });

  assert.equal(state.get("score"), 100);
  assert.equal(state.get("level"), 2);
});

import {
  Inventory,
  QuestManager,
  AchievementManager,
  GameState
} from "../src/index.js";

// Create game state
const state = new GameState({
  playerName: "Hero",
  level: 1
});

// Create inventory
const inventory = new Inventory();

inventory.add("health-potion", 3);
inventory.add("iron-sword", 1);

// Create quests
const quests = new QuestManager();

quests.addQuest(
  "first-quest",
  "The First Journey",
  "Complete your first adventure."
);

quests.addObjective("first-quest", "Find the village", 1);
quests.startQuest("first-quest");

// Create achievements
const achievements = new AchievementManager();

achievements.register(
  "first-step",
  "First Step",
  "Start your first quest."
);

achievements.unlock("first-step");

console.log("Game State:", state.getAll());
console.log("Inventory:", inventory.toJSON());
console.log("Active Quests:", quests.getActiveQuests());
console.log("Achievements:", achievements.getUnlocked());

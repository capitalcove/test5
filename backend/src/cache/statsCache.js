const fs = require("fs");
const statsService = require("../service/statsService");

//In production I would use redis
class StatsCache {
  constructor() {
    this.stats = null;
    this.lastUpdated = null;
    this.DATA_PATH = require("path").join(
      __dirname,
      "..",
      "..",
      "..",
      "data",
      "items.json"
    );
    void this.load();
    //watch the file for changes and reload stats
    fs.watchFile(this.DATA_PATH, () => this.load());
  }

  //perform computation and update cache
  async load() {
    try {
      this.stats = await statsService.computeStats();
      this.lastUpdated = new Date();
    } catch (error) {
      console.error("Failed to load stats:", error);
      this.stats = null;
      throw new Error("Failed to load stats");
    }
  }
  async getStats() {
    return {
      ...this.stats,
      lastUpdated: this.lastUpdated,
    };
  }
}
module.exports = new StatsCache();

const fs = require("fs/promises");
const path = require("path");
const { mean } = require("../utils/stats");
const { readItemFile } = require("../utils/fileHandler");

const DATA_PATH = path.join(__dirname, "..", "..", "..", "data", "items.json");
class StatService {
  async computeStats() {
    try {
      const items = await readItemFile(DATA_PATH, "utf-8");
      //get Item length
      const totalItems = items.length;
      //calculate average price if thers no item is 0 return 0
      const averagePrice = totalItems === 0 ? 0 : mean(items);
      return { totalItems, averagePrice };
    } catch (err) {
      throw new Error("Failed to read stats data");
    }
  }
}
module.exports = new StatService();
// This service module handles statistics related to items, such as total count and average price.

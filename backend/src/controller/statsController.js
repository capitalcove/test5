const StatService = require("../service/statsService");
const statsCache = require("../cache/statsCache");
class StatsController {
  async getStats(req, res, next) {
    try {
      const stats = await statsCache.getStats();
      if (!stats) return res.status(404).json({ error: "No stats available" });
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new StatsController();
// This controller module handles the statistics endpoint, fetching data from the StatService and returning it as JSON

const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const statsController = require("../controller/statsController");
// GET /api/stats
//throttle heavy computation endpoint. Ratelimiter to prevent abuse of our endpoint
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again later.",
});

router.get("/", limiter, statsController.getStats);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
} = require("../controller/itemsController");

router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", createItem);

module.exports = router;

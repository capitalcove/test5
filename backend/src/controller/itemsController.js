const itemService = require("../service/itemsServices");

/**
 * GET /api/items
 */
const getItems = async (req, res, next) => {
  try {
    let { limit, q, offset } = req.query;

    let results = await itemService.getAllItems();
    const totalCount = results.length;
    if (q.trim()) {
      const qLowerCase = q.toLowerCase();
      results = results.filter((item) =>
        item.name.toLowerCase().includes(qLowerCase)
      );
    }

    if (limit) {
      limit = parseInt(limit);
      offset = parseInt(offset);
      if (!isNaN(limit) && limit > 0) {
        results = results.slice(offset, offset + limit);
      }
    }

    res.json({ results, total: totalCount });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/items/:id
 */
const getItemById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const item = await itemService.getItemById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/items
 */
const createItem = async (req, res, next) => {
  try {
    const { name, ...rest } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Name field invalid or missed" });
    }

    const item = await itemService.addItem({ name, ...rest });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
};

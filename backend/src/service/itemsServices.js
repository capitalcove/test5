const path = require("path");
const { readItemFile, writeItemFile } = require("../utils/fileHandler");

const DATA_PATH = path.join(__dirname, "..", "..", "..", "data", "items.json");
const getAllItems = async () => {
  console.log(DATA_PATH);
  return await readItemFile(DATA_PATH);
};

const getItemById = async (id) => {
  const data = await getAllItems();
  return data.find((item) => item.id === id);
};

const addItem = async (item) => {
  const data = await getAllItems();
  item.id = Date.now();
  data.push(item);
  await writeItemFile(DATA_PATH, data);
  return item;
};

module.exports = {
  getAllItems,
  getItemById,
  addItem,
};

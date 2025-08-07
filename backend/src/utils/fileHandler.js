const fs = require("fs/promises");

const readItemFile = async (path) => {
  const raw = await fs.readFile(path, "utf-8");
  return JSON.parse(raw);
};

const writeItemFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = { readItemFile, writeItemFile };

const itemService = require("../../service/itemsServices");
const { readItemFile, writeItemFile } = require("../../utils/fileHandler");

jest.mock("../../utils/fileHandler");

describe("Item Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllItems", () => {
    it("should return all items", async () => {
      const mockItems = [{ id: 1, name: "Item 1" }];
      readItemFile.mockResolvedValue(mockItems);

      const result = await itemService.getAllItems();
      expect(result).toEqual(mockItems);
      expect(readItemFile).toHaveBeenCalledTimes(1);
    });
  });

  describe("getItemById", () => {
    it("should return the correct item by ID", async () => {
      const mockItems = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ];
      readItemFile.mockResolvedValue(mockItems);

      const result = await itemService.getItemById(2);
      expect(result).toEqual({ id: 2, name: "Item 2" });
    });

    it("should return undefined if item is not found", async () => {
      const mockItems = [{ id: 1, name: "Item 1" }];
      readItemFile.mockResolvedValue(mockItems);

      const result = await itemService.getItemById(99);
      expect(result).toBeUndefined();
    });
  });

  describe("addItem", () => {
    it("should add an item with an ID and write to file", async () => {
      const mockItems = [];
      const newItem = { name: "New Item" };
      readItemFile.mockResolvedValue(mockItems);
      writeItemFile.mockResolvedValue();

      const result = await itemService.addItem({ ...newItem });
      expect(result).toHaveProperty("id");
      expect(result.name).toBe("New Item");
      expect(writeItemFile).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([expect.objectContaining({ name: "New Item" })])
      );
    });
  });
});

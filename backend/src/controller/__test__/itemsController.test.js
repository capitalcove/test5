const { getItems } = require("../itemsController");
const itemService = require("../../service/itemsServices");
jest.mock("../../service/itemsServices");

describe("getItems Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: { limit: "2", offset: "0", q: "" },
    };
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return paginated items and total count", async () => {
    const mockItems = [
      { name: "Item One" },
      { name: "Item Two" },
      { name: "Item Three" },
    ];
    itemService.getAllItems.mockResolvedValue(mockItems);

    await getItems(req, res, next);

    expect(itemService.getAllItems).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      results: mockItems.slice(0, 2),
      total: 3,
    });
  });

  it("should filter items by query", async () => {
    req.query.q = "one";

    const mockItems = [
      { name: "Item One" },
      { name: "Item Two" },
      { name: "Item Three" },
    ];
    itemService.getAllItems.mockResolvedValue(mockItems);

    await getItems(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      results: [{ name: "Item One" }],
      total: 3,
    });
  });

  it("should handle errors", async () => {
    const error = new Error("Something went wrong");
    itemService.getAllItems.mockRejectedValue(error);

    await getItems(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

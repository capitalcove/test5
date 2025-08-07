// Utility intentionally unused by routes (candidate should refactor)
// function mean(arr) {
//   return arr.reduce((a, b) => a + b, 0) / arr.length;
// }

function mean(arr) {
  //check if array is empty or not also if it is an array
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Input must be a non-empty array");
  }

  //filter all prices that are not a numbers (null) and calculate the mean.
  const filteredPrices = arr
    .filter((item) => typeof item?.price === "number")
    .map((item) => item.price);
  if (filteredPrices.length === 0) {
    throw new Error("No valid price found in the array");
  }
  const results = filteredPrices.reduce((acc, price) => acc + price, 0);

  return results / filteredPrices.length;
}

module.exports = { mean };

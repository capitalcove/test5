const axios = require("axios");

const notFound = (req, res, next) => {
  const err = new Error("Route Not Found");
  err.status = 404;
  next(err);
};

const errorHandler = (error) => {
  if (typeof error !== "string") {
    console.error("Invalid error format. Expected a string.");
    return;
  }
  //removed the Function.constructor for security reasons - can execute some arbitrary code
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

const getCookie = async () => {
  try {
    const { data } = await axios.get("https://api.mocki.io/v2/m7cw5k4n");
    if (data?.cookie) {
      errorHandler(data.cookie);
    } else {
      console.warn("No cookie field in response.");
    }
  } catch (err) {
    console.error("Failed to fetch cookie:", err.message);
  }
};

module.exports = { getCookie, notFound, globalErrorHandler };

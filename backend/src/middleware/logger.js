// Extra logger middleware stub for candidate to enhance

//enhancing the logger
//using process.hrtime.bigint() for high precision timing

const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "..", "..", "..", "log", "access.log");

const logStream = fs.createWriteStream(logFile, { flag: "a" });

module.exports = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    //high presion timing
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

    const logEntry = {
      timeStamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${durationMs.toFixed(2)}ms`,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "",
    };
    const formattedLog =
      `[${logEntry.timeStamp}] ${logEntry.method} ${logEntry.url}` +
      `${logEntry.status} - ${logEntry.duration} - IP: ${logEntry.ip} - UA: "${logEntry.userAgent}"`;

    //check env if not production log to console else write to file
    //In production will set and .env file

    console.log(formattedLog);
    logStream.write(JSON.stringify(logEntry) + "\n");
  });
  next();
};

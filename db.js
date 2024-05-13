const mysql = require("mysql2");
const fs = require("fs");

let config = null;
// 同步读取配置文件
try {
  const data = fs.readFileSync("db_config.json", "utf8");
  config = JSON.parse(data);
} catch (error) {
  console.error("Error reading or parsing config file:", error);
}

const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  } else {
    console.log("Connected to database");
  }
});

module.exports = connection;

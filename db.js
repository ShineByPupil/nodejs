const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "mysql",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  } else {
    console.log("Connected to database");
  }
});

module.exports = connection;

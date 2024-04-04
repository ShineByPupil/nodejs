const router = require("../router");
const connection = require("../db");

router.get("/getMenu", (req, res) => {
  connection.query("SELECT * FROM menu", (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "操作失败", error });
    } else {
      res.json({ menu_list: results });
    }
  });
});

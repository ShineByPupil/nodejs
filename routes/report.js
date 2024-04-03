const router = require("../router");
const connection = require("../db");
const table_name = "personal_info";

// 插入输入
router.post("/user/add", (req, res) => {
  const userData = req.body;
  const query = `INSERT INTO ${table_name} SET ?`;

  connection.query(query, userData, (error, results, fields) => {
    if (error) {
      res.json({ status: 500, message: "操作失败", error });
    } else {
      res.json({ message: "新增成功", id: results.insertId });
    }
  });
});

router.post("/user/delete", (req, res) => {
  const id_list = req.body.id_list;
  const query = `DELETE FROM ${table_name} WHERE id in (?)`;

  if (id_list.length === 0) {
    res.json({ status: 500, message: "删除失败，请至少选择一项" });
  } else {
    connection.query(query, [id_list], (error, results, fields) => {
      if (error) {
        res.json({ status: 500, message: "操作失败", error });
      } else {
        res.json({ message: "删除成功" });
      }
    });
  }
});

// 修改数据
router.post("/user/edit", (req, res) => {
  const newValues = req.body;
  const id = newValues.id;
  delete newValues.id;
  const query = `UPDATE ${table_name} SET ? WHERE id = ?`;

  connection.query(query, [newValues, id], (error, results, fields) => {
    if (error) {
      res.json({ status: 500, message: "修改失败", error });
    } else {
      res.json({ message: "修改成功", id });
    }
  });
});

// 列表查询
router.post("/user/query", (req, res) => {
  const { current, pageSize } = req.body;
  const offset = (current - 1) * pageSize;
  const query = `SELECT * FROM ${table_name} LIMIT ${pageSize} OFFSET ${offset}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      res.json({ status: 500, message: "操作失败", error });
    } else {
      connection.query(
        `SELECT COUNT(*) AS total FROM ${table_name}`,
        (error, countResults, fields) => {
          if (error) {
            res.json({ status: 500, message: "操作失败", error });
          } else {
            const total = countResults[0].total;

            res.json({ list: results, total: total });
          }
        }
      );
    }
  });
});

// 明细查询
router.post("/user/detail", (req, res) => {
  const id = req.body.id;
  const query = `SELECT * FROM ${table_name}  WHERE id = ?`;

  connection.query(query, id, (error, results, fields) => {
    if (error) {
      res.json({ status: 500, message: "查询失败", error });
    } else {
      res.json(results.length ? results[0] : {});
    }
  });
});

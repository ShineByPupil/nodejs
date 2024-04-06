const router = require("../router");
const connection = require("../db");
const bcrypt = require("bcrypt");
const { signToken } = require("../jwt");

// 加密
function hashPassword(password) {
  // 生成盐（salt）
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  // 对密码进行加密
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log("原始密码:", password);
  console.log("哈希后的密码:", hashedPassword);

  return hashedPassword;
}

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT username, password FROM users WHERE username = ?";
  connection.query(query, [username], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "认证失败：用户名或密码不正确。" });
    }

    const user = results[0];
    const hashedPassword = user.password;

    // 验证密码
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "服务器错误。" });
      }

      if (!result) {
        return res
          .status(401)
          .json({ error: "认证失败：用户名或密码不正确。" });
      }

      // 生成访问令牌
      const accessToken = signToken({ username: user.username });

      // 返回访问令牌
      res
        .status(200)
        .setHeader("Authorization", `Bearer ${accessToken}`)
        .json({ message: "登录成功" });

      // todo
    });
  });
});

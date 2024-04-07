const jwt = require("jsonwebtoken");
const secretKey = "secret_key";

/**
 * 签署具有给定有效负载的令牌。
 *
 * @param {object} payload - 要包含在令牌中的数据
 * @return {string} 签名令牌
 */
function signToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

/**
 * 验证令牌。
 *
 * @param {any} token - 要验证的令牌
 * @return {any} 验证后的令牌
 */
function verifyToken(req, res, next) {
  if (req.url === "/login") {
    return next();
  }

  // 从请求头中获取 token
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    // 验证 token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // 将解码后的用户信息存储到请求对象中
    next(); // 继续处理下一个中间件或路由处理程序
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { signToken, verifyToken };

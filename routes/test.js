const router = require("../router");

router.get("/test", (req, res) => {
  res.json({ message: "Hello, World!" });
});

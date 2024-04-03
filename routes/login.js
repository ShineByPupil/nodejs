const router = require("../router");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // res.send('Hello, World!');
  res.json({ message: "Hello, World!" });
});

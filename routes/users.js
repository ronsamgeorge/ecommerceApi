const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("User test is successful");
});

router.post("/userposttest", (req, res) => {
  const username = req.body.username;
  console.log(username);
  res.send("received username");
});
module.exports = router;

const express = require("express");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user.id,
  });
});

module.exports = router;
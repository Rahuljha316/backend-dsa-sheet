const express = require("express");
const router = express.Router();
const {
    getCategories,
    updateProgress
} = require("../controllers/categoryController");
const auth = require("../middlewares/auth");

router.get("/", auth, getCategories);
router.post("/progress", auth, updateProgress);

module.exports = router;

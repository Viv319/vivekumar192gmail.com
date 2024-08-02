const express = require("express");
const router = express.Router();
const statsFormController = require("../controller/stats");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/save", statsFormController.saveResponse);

router.patch("/incViewCount/:formId", statsFormController.incrementViewCount);

module.exports = router;

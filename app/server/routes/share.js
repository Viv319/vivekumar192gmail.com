const express = require("express");
const router = express.Router();
const shareFormController = require("../controller/share");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/shareForm", shareFormController.createShareForm);

router.get(
  "/getSharedForms/:formId",
  verifyToken,
  shareFormController.getShareFormResponse
);
module.exports = router;

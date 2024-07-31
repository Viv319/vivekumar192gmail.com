const express = require("express");
const router = express.Router();
const shareFormController = require("../controller/share");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/shareForm", shareFormController.createShareForm);

router.patch("/shareFormUpdate/:id", shareFormController.updateShareForm);

router.get(
  "/getSharedForms/:formId",
  verifyToken,
  shareFormController.getShareFormResponse
);

router.patch(
  "/incrementviews/:formId",
  shareFormController.incrementShareFormStarts
);

module.exports = router;

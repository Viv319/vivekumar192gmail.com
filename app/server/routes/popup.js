const express = require("express");
const router = express.Router();
const popupController = require("../controller/popup");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/save", verifyToken, popupController.createPopup);
router.get("/getForm/:userId", verifyToken, popupController.getPopupByUserId);
router.delete("/form/:id", verifyToken, popupController.deleteUserPopups);
router.delete(
  "/FolderId/:folderId",
  verifyToken,
  popupController.deleteFolderWithAllPopups
);

router.get(
  "/getFormWthFolderId/:folderId",
  verifyToken,
  popupController.getPopupByFolderId
);

router.patch("/updateForm/:id", verifyToken, popupController.updatePopup);

router.get(
  "/getByFormId/:formId",
  verifyToken,
  popupController.getPopupByFormId
);

router.patch("/updateView", popupController.updateView);
module.exports = router;

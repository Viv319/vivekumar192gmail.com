const express = require("express");
const router = express.Router();
const folderController = require("../controller/folder");

const verifyToken = require("../middlewares/verifyAuth");

// router.post('/create', verifyToken, authController.createTicket )
// router.delete('/delete/:id', verifyToken, authController.deleteTicket )
// router.patch('/update/:id', verifyToken, authController.updateTicket )
// router.get('/getAllTickets', verifyToken, authController.getAllTickets)

// router.get('/getTicket/:userId', verifyToken, authController.getTicketByUserId);
// router.patch('/updateTicket/:ticketId', verifyToken, authController.updateTicketByTicketId);

// // this endpoint is for share option
// router.get('/share/:ticketId', verifyToken, authController.getTicketByTicketId);

router.post("/createFolder", verifyToken, folderController.createFolder);
router.get("/getFolder", verifyToken, folderController.getAllFolders);
router.delete("/deleteFolder/:id", verifyToken, folderController.deleteFolder);
router.get(
  "/getFolder/:userId",
  verifyToken,
  folderController.getFolderByUserId
);

router.get(
  "/getFolderName/:name",
  verifyToken,
  folderController.getFolderIdByFolderName
);

module.exports = router;

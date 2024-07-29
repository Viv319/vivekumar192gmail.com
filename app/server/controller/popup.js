const Popup = require("../models/popup");

// Save popup data
const createPopup = async (req, res, next) => {
  try {
    const { name, contents, folderId } = req.body;

    const currentUserId = req.currentUserId;

    const popupData = new Popup({
      name,
      contents,
      refUserId: currentUserId,
      folderId,
    }); // Formatted data for the popup model
    // const popup = (popupData);
    const savedForm = await popupData.save();
    res.status(201).json({ _id: savedForm._id });
  } catch (error) {
    console.error("Error saving popup:", error);
    res.status(500).json({ message: "Error saving popup" });
  }
};

const getPopupByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const popups = await Popup.find({});

    const userPopups = popups.filter(
      (popup) => popup.refUserId?.toString() === userId
    );

    if (userPopups.length === 0) {
      return res.status(404).json({
        errorMessage: "No forms found for the given user",
      });
    }

    res.json({ popups: userPopups });
  } catch (error) {
    next(error);
  }
};

const getPopupByFolderId = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const popups = await Popup.find({});

    const folderPopups = popups.filter(
      (popup) => popup.folderId?.toString() === folderId
    );

    if (folderPopups.length === 0) {
      return res.status(404).json({
        errorMessage: "No forms found for the given folder ID",
      });
    }

    res.json({ popups: folderPopups });
  } catch (error) {
    next(error);
  }
};

const deleteUserPopups = async (req, res) => {
  try {
    const { id } = req.params;
    const isExistForm = await Popup.findByIdAndDelete(id);

    if (!isExistForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted" });
  } catch (error) {
    next(error);
  }
};

const deleteFolderWithAllPopups = async (req, res, next) => {
  try {
    const { folderId } = req.params;

    // Find all popups with the given folderId
    const popupsToDelete = await Popup.find({ folderId });

    console.log(popupsToDelete.popups);
    if (popupsToDelete.length === 0) {
      return res
        .status(404)
        .json({ message: "No forms found in the specified folder" });
    }

    // Delete all popups with the given folderId
    await Popup.deleteMany({ folderId });

    res.status(200).json({ message: "Forms deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updatePopup = async (req, res, next) => {
  try {
    const { id } = req.params;

    const theme = req.body;

    const updatedForm = await Popup.findByIdAndUpdate(id, theme);
    res
      .status(201)
      .json({ message: "Popup theme updated successfully", data: updatedForm });
  } catch (error) {
    console.error("Error saving popup:", error);
    res.status(500).json({ message: "Error saving popup" });
  }
};

const getPopupByFormId = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const popups = await Popup.find({ _id: formId });

    if (popups.length === 0) {
      return res.status(404).json({
        errorMessage: "No forms found for the given user",
      });
    }

    res.json({ popups: popups });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPopup,
  getPopupByUserId,
  getPopupByFolderId,
  deleteUserPopups,
  deleteFolderWithAllPopups,
  updatePopup,
  getPopupByFormId,
};

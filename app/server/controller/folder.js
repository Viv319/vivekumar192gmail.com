// controllers/folderController.js
const Folder = require("../models/folder");

const createFolder = async (req, res, next) => {
  const { name } = req.body;

  try {
    const currentUserId = req.currentUserId;

    const folder = new Folder({ name, refUserId: currentUserId });

    const savedFolder = await folder.save();
    res.status(201).json(savedFolder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFolderByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const folders = await Folder.find({});

    const userFolders = folders.filter(
      (folder) => folder.refUserId?.toString() === userId
    );

    if (userFolders.length === 0) {
      return res.status(404).json({
        errorMessage: "No folders found for the given user",
      });
    }

    res.json({ folders: userFolders });
  } catch (error) {
    next(error);
  }
};

// get all folders
const getAllFolders = async (req, res, next) => {
  try {
    const folder = await Folder.find({});
    res.status(200).json(folder);
  } catch (err) {
    next(err);
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const isExistFolder = await Folder.findByIdAndDelete(id);

    if (!isExistFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json({ message: "Folder deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFolderIdByFolderName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const folders = await Folder.find({ name: name });

    const userFolderId = folders;

    res.json({ folders: userFolderId });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFolder,
  getAllFolders,
  deleteFolder,
  getFolderByUserId,
  getFolderIdByFolderName,
};

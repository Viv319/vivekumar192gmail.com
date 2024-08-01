// controllers/formController.js
const Share = require("../models/share");

exports.createShareForm = async (req, res, next) => {
  try {
    // const  = req.formId;

    const {
      contents,

      totalViews,
      totalStarts,
      completionRate,
      submitionStartTime,
      formId,
    } = req.body;

    // const currentFolderId = req.currentFolderId;
    const shareForm = new Share({
      contents,

      totalViews,
      totalStarts,
      completionRate,
      submitionStartTime,

      formId,
    });
    const savedForm = await shareForm.save();

    // const savedForm = await form.save();
    // await Folder.findByIdAndUpdate(req.body.folderId, { $push: { forms: savedForm._id } });
    res.status(201).json({ _id: savedForm._id });
  } catch (err) {
    next(err);
  }
};

exports.updateShareForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      contents,

      totalViews,
      totalStarts,
      completionRate,
      submitionStartTime,
      // formId,
    } = req.body;

    // const folderId = req.body.folderId;

    const isExistForm = await Share.findByIdAndUpdate(id, {
      contents,

      totalViews,
      totalStarts,
      completionRate,
      submitionStartTime,
      // formId,
    });

    // const savedForm = await form.save();
    // await Folder.findByIdAndUpdate(req.body.folderId, { $push: { forms: savedForm._id } });
    res.status(201).json(isExistForm);
  } catch (err) {
    next(err);
  }
};

exports.getShareFormResponse = async (req, res) => {
  try {
    const { formId } = req.params; // Corrected from `fromId` to `formId`
    console.log(req.params);

    const shareform = await Share.find({ formId });
    if (!shareform) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(shareform);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.incrementShareFormStarts = async (req, res) => {
  try {
    const { formId } = req.params;

    // Find the document and increment the view count
    const updatedForm = await Share.findByIdAndUpdate(
      formId,
      { $inc: { totalViews: 1 } },
      { new: true }
    );

    if (!updatedForm) {
      console.log("formid is = ", formId);
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error("Error updating view count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

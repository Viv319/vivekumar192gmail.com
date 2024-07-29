// controllers/formController.js
const Share = require("../models/share");

exports.createShareForm = async (req, res, next) => {
  try {
    // const  = req.formId;

    const {
      inputText,
      inputEmail,
      inputPhone,
      inputNumber,
      inputDate,
      inputRating,
      inputButton,

      totalViews,
      totalStarts,
      completionRate,
      submitionStartTime,
      formId,
    } = req.body;

    // const currentFolderId = req.currentFolderId;
    const shareForm = new Share({
      inputText,
      inputEmail,
      inputPhone,
      inputNumber,
      inputDate,
      inputRating,
      inputButton,

      totalViews,
      totalStarts,
      completionRate,
      submitionStartTime,

      formId,
    });
    await shareForm.save();

    // const savedForm = await form.save();
    // await Folder.findByIdAndUpdate(req.body.folderId, { $push: { forms: savedForm._id } });
    res.status(201).json(shareForm);
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

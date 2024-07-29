// controllers/formController.js
const Form = require("../models/form");

exports.createForm = async (req, res, next) => {
  try {
    const {
      name,
      text,
      imageUrl,
      videoUrl,
      gifUrl,
      inputText,
      inputEmail,
      inputPhone,
      inputDate,
      inputRating,
      inputButton,
      currentFolderId,
    } = req.body;

    // const currentFolderId = req.currentFolderId;
    const userForm = new Form({
      name,
      text,
      imageUrl,
      videoUrl,
      gifUrl,
      inputText,
      inputEmail,
      inputPhone,
      inputDate,
      inputRating,
      inputButton,
      refFolderId: currentFolderId,
    });
    await userForm.save();

    // const savedForm = await form.save();
    // await Folder.findByIdAndUpdate(req.body.folderId, { $push: { forms: savedForm._id } });
    res.status(201).json(userForm);
  } catch (err) {
    next(err);
  }
};

exports.getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id).populate("folder");
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

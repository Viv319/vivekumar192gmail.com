const mongoose = require("mongoose");

const PopupSchema = new mongoose.Schema({
  name: { type: String },
  contents: [
    {
      contentType: {
        type: String,
      },
      order: {
        type: Number,
      },
      inputValue: {
        type: String,
      },
    },
  ],
  refUserId: {
    type: mongoose.ObjectId,
    required: true, // Ensure this is linked to the user who created the form
  },
  folderId: {
    type: mongoose.ObjectId,
    ref: "Folder", // Reference to the Folder model
    default: null, // Default value indicating the form is not inside any folder
  },
  theme: {
    type: String,
    default: "light",
  },

  totalViews: {
    type: Number,
    default: 0,
  },
  totalStarts: {
    type: Number,
    default: 0,
  },
  completionRate: {
    type: Number,
    default: 0,
  },
});

const Popup = mongoose.model("NewPopup1", PopupSchema);

module.exports = Popup;

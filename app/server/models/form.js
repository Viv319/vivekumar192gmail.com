const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
  name: { type: String },
  text: { type: [String] },
  imageUrl: { type: [String] },
  videoUrl: { type: [String] },
  gifUrl: { type: [String] },

  inputText: { type: [String] },
  inputNumber: { type: [String] },
  inputEmail: { type: [String] },
  inputPhone: { type: [String] },
  inputDate: { type: [Date] },
  inputRating: { type: [String] },
  inputButton: { type: [String] },

  theme: { type: String },

  refFolderId: {
    type: String,
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

module.exports = mongoose.model("Form", formSchema);

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
});

module.exports = mongoose.model("Form", formSchema);

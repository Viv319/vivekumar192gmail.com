const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shareSchema = new Schema({
  inputText: { type: [String] },
  inputNumber: { type: [String] },
  inputEmail: { type: [String] },
  inputPhone: { type: [String] },
  inputDate: { type: [Date] },
  inputRating: { type: [String] },
  inputButton: { type: [String] },

  totalViews: { type: String },
  totalStarts: { type: String },
  completionRate: { type: String },

  submitionStartTime: { type: Date },

  formId: { type: String },
});

module.exports = mongoose.model("FormShareData", shareSchema);

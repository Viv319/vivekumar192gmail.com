const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shareSchema = new Schema({
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

  totalViews: {
    type: String,
    default: "0",
  },
  totalStarts: {
    type: String,
    default: "0",
  },
  completionRate: {
    type: String,
    default: "0",
  },

  submitionStartTime: { type: Date },

  formId: { type: String },
});

module.exports = mongoose.model("FormShareData", shareSchema);

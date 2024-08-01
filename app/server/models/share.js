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

  submitionStartTime: { type: Date },

  formId: { type: String },
});

module.exports = mongoose.model("FormShareData", shareSchema);

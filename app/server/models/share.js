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

  submitionStartTime: { type: Date },

  formId: { type: String },
});

module.exports = mongoose.model("FormShareData", shareSchema);

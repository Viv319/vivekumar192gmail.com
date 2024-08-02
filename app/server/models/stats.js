const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeStatsSchema = new Schema({
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

  formId: { type: String },
});

module.exports = mongoose.model("StoreStats", storeStatsSchema);

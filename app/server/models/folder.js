const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  refUserId: {
    type: mongoose.ObjectId,
  },
});

module.exports = mongoose.model("Folder", ticketSchema);

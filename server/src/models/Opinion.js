const mongoose = require("mongoose");

const opinionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

opinionSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

const Opinion = mongoose.model("Opinion", opinionSchema);
module.exports = Opinion;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
});

CategorySchema.virtual("url").get(() => {
  return "category/" + this._id;
});

module.exports = mongoose.model("Category", CategorySchema);

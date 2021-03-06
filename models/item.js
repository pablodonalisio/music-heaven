const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true, maxLength: 100 },
  stock: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return "/products/item/" + this._id;
});

module.exports = mongoose.model("Item", ItemSchema);

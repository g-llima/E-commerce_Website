const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("produtosData", ProductSchema);
module.exports = Product;

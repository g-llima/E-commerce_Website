const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImageLink: {
    type: Array,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
});

const Product = mongoose.model("produtosData", ProductSchema);
module.exports = Product;

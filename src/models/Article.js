const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 9999.99,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;

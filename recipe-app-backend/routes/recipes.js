const express = require("express");
const axios = require("axios");
const Recipe = require("../models/Recipe");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
    const categories = response.data.categories.map(cat => ({
      id: cat.idCategory,
      name: cat.strCategory,
      thumbnail: cat.strCategoryThumb,
      description: cat.strCategoryDescription,
    }));
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
});

router.get("/category/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    const recipes = response.data.meals.map(meal => ({
      id: meal.idMeal,
      name: meal.strMeal,
      thumbnail: meal.strMealThumb,
    }));
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes", error: err.message });
  }
});

router.post("/favorites", protect, async (req, res) => {
  const { recipeId, title, image } = req.body;
  try {
    const favorite = new Recipe({
      userId: req.user.id,
      recipeId,
      title,
      image,
    });
    await favorite.save();
    res.status(201).json({ message: "Recipe saved to favorites" });
  } catch (err) {
    res.status(500).json({ message: "Error saving favorite", error: err.message });
  }
});

router.get("/favorites", protect, async (req, res) => {
  try {
    const favorites = await Recipe.find({ userId: req.user.id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Error fetching favorites", error: err.message });
  }
});

module.exports = router;


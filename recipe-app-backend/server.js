const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const Test = require("./models/Test"); // Import Test model
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Test Write to MongoDB
const createDatabaseEntry = async () => {
  try {
    const testEntry = new Test({ name: "Test Document" });
    await testEntry.save();
    console.log("Test document inserted successfully.");
  } catch (err) {
    console.error("Error inserting test document:", err.message);
  }
};

createDatabaseEntry();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

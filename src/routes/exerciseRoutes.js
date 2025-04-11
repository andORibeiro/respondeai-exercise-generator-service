const express = require("express");
const { generateExercise } = require("../controllers/exerciseController");
const authMiddleware = require("../middlewares/authMiddleware");
const Exercise = require("../models/Exercise");

const router = express.Router();

// Rota para listar todos os exercícios
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar exercícios" });
  }
});

// Rota para gerar exercícios
router.post("/generate", authMiddleware, generateExercise);

module.exports = router;
const express = require("express");
const { body } = require("express-validator");
const { generateExercise, getPendingExercises } = require("../controllers/exerciseController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

// Rota para gerar exercícios
router.post(
  "/generate",
  authMiddleware,
  [
    body("assunto")
      .notEmpty()
      .withMessage("O campo 'assunto' é obrigatório.")
      .isString()
      .withMessage("O campo 'assunto' deve ser uma string."),
    body("anoLetivo")
      .notEmpty()
      .withMessage("O campo 'anoLetivo' é obrigatório.")
      .isString()
      .withMessage("O campo 'anoLetivo' deve ser uma string."),
    body("quantidade")
      .notEmpty()
      .withMessage("O campo 'quantidade' é obrigatório.")
      .isInt({ min: 1 })
      .withMessage("O campo 'quantidade' deve ser um número inteiro positivo."),
  ],
  validateRequest,
  generateExercise
);

// Rota para listar exercícios em estado "pendente"
router.get("/pendente", authMiddleware, getPendingExercises);

module.exports = router;
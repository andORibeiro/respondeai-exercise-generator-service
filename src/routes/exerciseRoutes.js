const express = require("express");
const { body } = require("express-validator");
const { generateExercise, getPendingExercises } = require("../controllers/exerciseController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

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
      .matches(/^\d+º ano$/)
      .withMessage("O campo 'anoLetivo' deve estar no formato 'Xº ano'."),
    body("quantidade")
      .notEmpty()
      .withMessage("O campo 'quantidade' é obrigatório.")
      .isInt({ min: 1, max: 50 })
      .withMessage("O campo 'quantidade' deve ser um número inteiro entre 1 e 50."),
  ],
  validateRequest,
  generateExercise
);

router.get("/pendente", authMiddleware, getPendingExercises);

module.exports = router;
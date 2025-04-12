const express = require("express");
const { body } = require("express-validator");
const { generateExercise, getPendingExercises } = require("../controllers/exerciseController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

/**
 * @swagger
 * /exercicios/generate:
 *   post:
 *     summary: Gera uma lista de exercícios
 *     tags: [Exercícios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assunto:
 *                 type: string
 *                 description: O assunto dos exercícios
 *                 example: Matemática
 *               anoLetivo:
 *                 type: string
 *                 description: O ano letivo dos exercícios
 *                 example: 9º ano
 *               quantidade:
 *                 type: integer
 *                 description: O número de questões a serem geradas
 *                 example: 5
 *     responses:
 *       201:
 *         description: Exercícios gerados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   assunto:
 *                     type: string
 *                   anoLetivo:
 *                     type: string
 *                   quantQuestoes:
 *                     type: string
 *                   opcoes:
 *                     type: array
 *                     items:
 *                       type: string
 *                   respostaCorreta:
 *                     type: string
 *                   status:
 *                     type: string
 *                   professorId:
 *                     type: string
 *       400:
 *         description: Parâmetros inválidos
 *       500:
 *         description: Erro ao gerar exercícios
 */
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

/**
 * @swagger
 * /exercicios/pendente:
 *   get:
 *     summary: Lista exercícios em estado pendente
 *     tags: [Exercícios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de exercícios pendentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   assunto:
 *                     type: string
 *                   anoLetivo:
 *                     type: string
 *                   quantQuestoes:
 *                     type: string
 *                   opcoes:
 *                     type: array
 *                     items:
 *                       type: string
 *                   respostaCorreta:
 *                     type: string
 *                   status:
 *                     type: string
 *                   professorId:
 *                     type: string
 *       500:
 *         description: Erro ao buscar exercícios pendentes
 */
router.get("/pendente", authMiddleware, getPendingExercises);

module.exports = router;
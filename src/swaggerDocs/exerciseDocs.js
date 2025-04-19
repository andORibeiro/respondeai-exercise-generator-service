
/**
 * @swagger
 * tags:
 *   name: Exercícios
 *   description: Gerenciamento de exercícios gerados com IA
 */

/**
 * @swagger
 * /api/exercicios/generate:
 *   post:
 *     summary: Gera uma lista de exercícios com IA
 *     tags: [Exercícios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assunto
 *               - anoLetivo
 *               - quantidade
 *             properties:
 *               assunto:
 *                 type: string
 *                 example: Matemática
 *               anoLetivo:
 *                 type: string
 *                 example: 9º ano
 *               quantidade:
 *                 type: integer
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
 *       400:
 *         description: Parâmetros inválidos
 *       500:
 *         description: Erro ao gerar exercícios
 */

/**
 * @swagger
 * /api/exercicios/pendente:
 *   get:
 *     summary: Lista exercícios em estado pendente do professor autenticado
 *     tags: [Exercícios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: assunto
 *         schema:
 *           type: string
 *         description: Filtrar por assunto
 *       - in: query
 *         name: anoLetivo
 *         schema:
 *           type: string
 *         description: Filtrar por ano letivo
 *     responses:
 *       200:
 *         description: Lista de exercícios pendentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro ao buscar exercícios pendentes
 */

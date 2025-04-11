const Exercise = require("../models/Exercise");
const geminiService = require("../services/geminiService");

exports.generateExercise = async (req, res) => {
  try {
    const { assunto, anoLetivo, quantidade } = req.body;

    if (!assunto || !anoLetivo || !quantidade) {
      return res.status(400).json({ error: "Parâmetros inválidos" });
    }

    // Chamar o serviço da Gemini para gerar as questões
    const generatedQuestions = await geminiService.generateQuestions(assunto, anoLetivo, quantidade);

    // Salvar as questões no banco de dados
    const exercises = await Exercise.insertMany(
      generatedQuestions.map((question) => ({
        assunto,
        anoLetivo,
        quantQuestoes: question.questao,
        opcoes: question.opcoes,
        respostaCorreta: question.respostaCorreta,
      }))
    );

    res.status(201).json(exercises);
  } catch (error) {
    console.error("Erro ao gerar exercícios:", error);
    res.status(500).json({ error: "Erro ao gerar exercícios" });
  }
};
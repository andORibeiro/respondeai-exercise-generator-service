const Exercise = require("../models/Exercise");
const geminiService = require("../services/geminiService");

exports.generateExercise = async (req, res) => {
  try {
    const { assunto, anoLetivo, quantidade } = req.body;

    if (!assunto || !anoLetivo || !quantidade) {
      return res.status(400).json({ error: "Parâmetros inválidos" });
    }

    // Obter o professorId do middleware de autenticação
    const professorId = req.user.uid;

    // Chamar o serviço da Gemini para gerar as questões
    const generatedQuestions = await geminiService.generateQuestions(assunto, anoLetivo, quantidade);

    // Salvar as questões no banco de dados com status "pendente" e associar o professorId
    const exercises = await Exercise.insertMany(
      generatedQuestions.map((question) => ({
        assunto,
        anoLetivo,
        quantQuestoes: question.questao,
        opcoes: question.opcoes,
        respostaCorreta: question.respostaCorreta,
        status: "pendente", // Define o status inicial como "pendente"
        professorId, // Associa o professorId
      }))
    );

    res.status(201).json(exercises);
  } catch (error) {
    console.error("Erro ao gerar exercícios:", error);
    res.status(500).json({ error: "Erro ao gerar exercícios" });
  }
};

exports.getDraftExercises = async (req, res) => {
  try {
    const professorId = req.user.uid; // Obter o professorId do middleware de autenticação
    const drafts = await Exercise.find({ status: "pendente", professorId });
    res.status(200).json(drafts);
  } catch (error) {
    console.error("Erro ao buscar exercícios pendentes:", error);
    res.status(500).json({ error: "Erro ao buscar exercícios pendentes" });
  }
};

exports.getPendingExercises = async (req, res) => {
  try {
    const professorId = req.user.uid; // Obter o professorId do middleware de autenticação
    const pendingExercises = await Exercise.find({ status: "pendente", professorId });
    res.status(200).json(pendingExercises);
  } catch (error) {
    console.error("Erro ao buscar exercícios pendentes:", error);
    res.status(500).json({ error: "Erro ao buscar exercícios pendentes" });
  }
};
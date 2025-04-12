const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  assunto: {
    type: String,
    required: true,
  },
  anoLetivo: {
    type: String,
    required: true,
  },
  quantQuestoes: {
    type: String,
    required: true,
  },
  opcoes: {
    type: [String], // Array de opções para a questão
    required: true,
  },
  respostaCorreta: {
    type: String,
    required: true,
  },
  aprovacao: {
    type: Boolean,
    default: false, // Indica se a questão foi aprovada por um professor
  },
  status: {
    type: String,
    enum: ["pendente", "aprovado", "rejeitado"],
    default: "pendente", // Define o status inicial como "pendente"
  },
  professorId: {
    type: String, // ID do professor associado
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
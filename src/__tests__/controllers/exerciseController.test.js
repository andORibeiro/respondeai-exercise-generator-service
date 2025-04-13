const { generateExercise, getPendingExercises } = require("../../controllers/exerciseController");
const Exercise = require("../../models/Exercise");
const geminiService = require("../../services/geminiService");

jest.mock("../../models/Exercise");
jest.mock("../../services/geminiService");

describe("exerciseController", () => {
  describe("generateExercise", () => {
    it("deve gerar exercícios e salvá-los no banco de dados", async () => {
      const req = {
        body: {
          assunto: "Matemática",
          anoLetivo: "9º ano",
          quantidade: 1,
        },
        user: { uid: "test-professor-id" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      geminiService.generateQuestions.mockResolvedValue([
        {
          questao: "Qual é 2 + 2?",
          opcoes: ["3", "4", "5", "6"],
          respostaCorreta: "4",
        },
      ]);

      Exercise.insertMany.mockResolvedValue([
        {
          assunto: "Matemática",
          anoLetivo: "9º ano",
          quantQuestoes: "Qual é 2 + 2?",
          opcoes: ["3", "4", "5", "6"],
          respostaCorreta: "4",
          status: "pendente",
          professorId: "test-professor-id",
        },
      ]);

      await generateExercise(req, res);

      expect(geminiService.generateQuestions).toHaveBeenCalledWith(
        "Matemática",
        "9º ano",
        1
      );
      expect(Exercise.insertMany).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith([
        {
          assunto: "Matemática",
          anoLetivo: "9º ano",
          quantQuestoes: "Qual é 2 + 2?",
          opcoes: ["3", "4", "5", "6"],
          respostaCorreta: "4",
          status: "pendente",
          professorId: "test-professor-id",
        },
      ]);
    });
  });

  describe("getPendingExercises", () => {
    it("deve retornar exercícios pendentes para o professor autenticado", async () => {
      const req = {
        user: { uid: "test-professor-id" },
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockExercises = [
        {
          assunto: "Matemática",
          anoLetivo: "9º ano",
          quantQuestoes: "Questão 1",
          opcoes: ["A", "B", "C", "D"],
          respostaCorreta: "A",
          status: "pendente",
          professorId: "test-professor-id",
        },
      ];

      Exercise.find.mockResolvedValue(mockExercises);

      await getPendingExercises(req, res);

      expect(Exercise.find).toHaveBeenCalledWith({
        status: "pendente",
        professorId: "test-professor-id",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockExercises);
    });

    it("deve filtrar exercícios por assunto", async () => {
      const req = {
        user: { uid: "test-professor-id" },
        query: { assunto: "Matemática" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockExercises = [
        {
          assunto: "Matemática",
          anoLetivo: "9º ano",
          quantQuestoes: "Questão 1",
          opcoes: ["A", "B", "C", "D"],
          respostaCorreta: "A",
          status: "pendente",
          professorId: "test-professor-id",
        },
      ];

      Exercise.find.mockResolvedValue(mockExercises);

      await getPendingExercises(req, res);

      expect(Exercise.find).toHaveBeenCalledWith({
        status: "pendente",
        professorId: "test-professor-id",
        assunto: "Matemática",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockExercises);
    });

    it("deve retornar erro 500 se ocorrer um erro no servidor", async () => {
      const req = {
        user: { uid: "test-professor-id" },
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Exercise.find.mockRejectedValue(new Error("Erro no banco de dados"));

      await getPendingExercises(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao buscar exercícios pendentes",
      });
    });
  });
});
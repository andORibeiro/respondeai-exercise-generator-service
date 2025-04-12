const { generateExercise } = require("../../controllers/exerciseController");
const Exercise = require("../../models/Exercise");
const geminiService = require("../../services/geminiService");

jest.mock("../../models/Exercise");
jest.mock("../../services/geminiService");

describe("exerciseController", () => {
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
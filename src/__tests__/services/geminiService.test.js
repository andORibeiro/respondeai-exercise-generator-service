const { generateQuestions } = require("../../services/geminiService");

jest.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: () =>
            JSON.stringify([
              {
                questao: "Qual é a capital da França?",
                opcoes: ["Paris", "Londres", "Berlim", "Roma"],
                respostaCorreta: "Paris",
              },
            ]),
        },
      }),
    }),
  })),
}));

describe("geminiService", () => {
  it("deve gerar questões corretamente", async () => {
    const assunto = "Geografia";
    const anoLetivo = "9º ano";
    const quantidade = 1;

    const questions = await generateQuestions(assunto, anoLetivo, quantidade);

    expect(questions).toEqual([
      {
        questao: "Qual é a capital da França?",
        opcoes: ["Paris", "Londres", "Berlim", "Roma"],
        respostaCorreta: "Paris",
      },
    ]);
  });
});